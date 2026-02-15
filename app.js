/**
 * IB Psychology 2027 Marking Tool - Engine
 * Handles UI Generation, Logic, Persistence, and High-Context Exports
 */

let appState = {};
const STORAGE_KEY = 'psych_2027_master_vFinal';
// Official order matching the Guide and Sidebar hierarchy
const ORDER = ['p1a', 'p1b', 'p1c', 'p2aq1', 'p2aq2', 'p2aq3', 'p2aq4', 'p2b', 'p3q1', 'p3q2', 'p3q3', 'p3q4', 'ia'];

// 1. INITIALIZATION
window.onload = () => {
    initSidebar();
    loadState();
    nav('p1a'); // Start at Paper 1 Section A
};

// 2. UI GENERATION
function initSidebar() {
    const container = document.getElementById('nav-container');
    const groups = {
        "Paper 1: Core": ["p1a", "p1b", "p1c"],
        "Paper 2: Options": ["p2aq1", "p2aq2", "p2aq3", "p2aq4", "p2b"],
        "Paper 3: HL Ext": ["p3q1", "p3q2", "p3q3", "p3q4"],
        "Internal Assessment": ["ia"]
    };

    let html = "";
    for (const [cat, ids] of Object.entries(groups)) {
        html += `<div class="nav-cat">${cat}</div><ul>`;
        ids.forEach(id => {
            const rubric = PSYCH_RUBRICS[id];
            html += `<li><a onclick="nav('${id}')" id="btn-${id}">${rubric.title}</a></li>`;
        });
        html += `</ul>`;
    }
    container.innerHTML = html;
}

function renderRubric(id) {
    const rubric = PSYCH_RUBRICS[id];
    const container = document.getElementById('active-view-container');
    
    let html = `
        <div class="view active" id="${id}">
            <span class="guide-ref">${rubric.ref}</span>
            <h1>${rubric.title}</h1>
            
            <div class="context-box">
                <label>Question / Prompt being marked</label>
                <input type="text" class="q-input" id="q-${id}" 
                    value="${appState['q-'+id] || ''}"
                    placeholder="Paste specific question/prompt text here to anchor AI drafting..." 
                    oninput="saveInput('q-${id}', this.value)">
            </div>`;

    rubric.strands.forEach((strand, sIdx) => {
        html += `
            <div class="card">
                <span class="strand-title">${strand.name}</span>`;
        
        strand.options.forEach(opt => {
            const name = `rad-${id}-s${sIdx}`;
            const checked = appState[name] == opt.val ? 'checked' : '';
            html += `
                <label class="row-opt">
                    <input type="radio" name="${name}" value="${opt.val}" ${checked} 
                        onchange="saveRadio('${name}', ${opt.val})">
                    <span class="mark-tag">${opt.label}</span>
                    <div class="txt-body">${opt.text}</div>
                </label>`;
        });
        html += `</div>`;
    });

    const commVal = appState[`comm-${id}`] || "";
    const manVal = appState[`man-${id}`] || "";

    html += `
            <div class="context-box">
                <label>Manual Mark Entry (Priority Override)</label>
                <input type="number" class="manual-grade-field" id="man-${id}" 
                    value="${manVal}" oninput="saveInput('man-${id}', this.value)">
            </div>
            <textarea id="comm-${id}" placeholder="Comment" oninput="saveInput('comm-${id}', this.value)">${commVal}</textarea>
        </div>`;

    container.innerHTML = html;
    calculateScore(id);
}

// 3. NAVIGATION
function nav(id) {
    if (id === 'export') {
        renderExportManager();
    } else if (id === 'help') {
        renderHelp();
    } else {
        renderRubric(id);
    }
    
    document.querySelectorAll('#sidebar a').forEach(a => a.classList.remove('active'));
    const btn = document.getElementById('btn-' + id);
    if (btn) btn.classList.add('active');
    window.scrollTo(0, 0);
}

// 4. LOGIC ENGINE (VERBATIM BEST-FIT & SUMMATIVE)
function calculateScore(id) {
    const rubric = PSYCH_RUBRICS[id];
    const display = document.getElementById('score-out');
    const title = document.getElementById('fit-title');
    const logic = document.getElementById('fit-logic');

    // Priority 1: Manual Override
    const manVal = appState[`man-${id}`];
    if (manVal && manVal !== "") {
        display.innerText = manVal;
        title.innerText = "Manual Teacher Override";
        logic.innerText = "Mathematical Best-Fit has been bypassed by manual teacher entry.";
        save();
        return;
    }

    // Collect levels
    let pts = 0;
    let count = 0;
    rubric.strands.forEach((_, sIdx) => {
        const val = appState[`rad-${id}-s${sIdx}`];
        if (val) {
            pts += parseFloat(val);
            count++;
        }
    });

    if (count === 0) {
        display.innerText = "0";
        title.innerText = "Select descriptors...";
        logic.innerText = "Awaiting strand selections for best-fit analysis.";
        return;
    }

    let avg = pts / count;

    // IA Logic: Summative (Criteria A+B+C+D)
    if (rubric.type === "summative") {
        display.innerText = pts;
        title.innerText = `Cumulative IA Mark: ${pts} / 24`;
        logic.innerText = `Mathematical Logic: A+B+C+D summative achievement (Current: ${pts}/24).`;
    } 
    // Exam Logic: Best-Fit Averaging
    else if (rubric.type === "best-fit-15") {
        const ranges = ["0", "1-3", "4-6", "7-9", "10-12", "13-15"];
        const names = ["N/A", "Rudimentary", "Basic", "Satisfactory", "Good", "Excellent"];
        let bandIdx = Math.round(avg);
        
        // Refined Point Estimate within band based on decimal
        let pointEstimate = (bandIdx * 3) - (3 - Math.round((avg % 1 || (avg == bandIdx ? 1 : 0)) * 3));
        if (bandIdx == 0) pointEstimate = 0;

        display.innerText = `${ranges[bandIdx]} (${pointEstimate})`;
        title.innerText = `${names[bandIdx]} performance level`;
        logic.innerText = `Best-Fit: Average level across ${count} strands is ${avg.toFixed(2)}. Calculated center is mark ${pointEstimate}.`;
    } 
    else {
        // Scaling Logic for SAQs (4m and 6m)
        let finalMark = Math.round(avg * (rubric.maxMark / rubric.strands[0].options.length));
        display.innerText = finalMark;
        title.innerText = avg > 1.5 ? "Strong Performance" : "Developing Performance";
        logic.innerText = `Scaling: Average level ${avg.toFixed(2)} mapped to section max of ${rubric.maxMark}.`;
    }
    save();
}

// 5. PERSISTENCE
function saveRadio(name, val) {
    appState[name] = val;
    save();
    calculateScore(name.split('-')[1]);
}

function saveInput(id, val) {
    appState[id] = val;
    save();
    if (id.startsWith('man-')) calculateScore(id.split('-')[1]);
}

function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) appState = JSON.parse(saved);
}

function resetRubrics() {
    if (confirm("Reset current student marks and comments? (Question fields will be kept for batch marking)")) {
        for (let key in appState) {
            if (!key.startsWith('q-')) delete appState[key];
        }
        save();
        location.reload();
    }
}

function resetAll() {
    if (confirm("Full wipe: Clear all data including questions?")) {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
    }
}

// 6. EXPORT MANAGER
function renderExportManager() {
    const container = document.getElementById('active-view-container');
    let html = `<h1>Export Manager</h1><p class="page-desc">Check components to include. Data-less sections are excluded from checkboxes by default.</p><div class="card">`;
    
    ORDER.forEach(id => {
        const rubric = PSYCH_RUBRICS[id];
        let hasMarking = false;
        rubric.strands.forEach((_, sIdx) => { if(appState[`rad-${id}-s${sIdx}`]) hasMarking = true; });
        if(appState[`comm-${id}`] && appState[`comm-${id}`].trim() !== "") hasMarking = true;
        if(appState[`man-${id}`] && appState[`man-${id}`] !== "") hasMarking = true;

        html += `
            <div class="export-row ${!hasMarking ? 'disabled' : ''}">
                <input type="checkbox" id="chk-${id}" ${hasMarking ? 'checked' : ''}>
                <label style="font-weight:bold">${rubric.title}</label>
            </div>`;
    });

    html += `</div><div style="display:flex; flex-direction:column; gap:10px;">
        <button class="btn btn-blue" onclick="doExport('simple')">Download Simple Feedback (.txt)</button>
        <button class="btn btn-green" onclick="doExport('student')">Generate AI Student Tutor Prompt</button>
        <button class="btn btn-purple" onclick="doExport('teacher')">Generate AI Teacher Formatter Prompt</button>
    </div>`;
    container.innerHTML = html;
}

function doExport(mode) {
    let output = "IB PSYCHOLOGY 2027 ASSESSMENT: RAW FEEDBACK LOG\n===============================================\n\n";
    
    ORDER.forEach(id => {
        const chk = document.getElementById(`chk-${id}`);
        if (chk && chk.checked) {
            const rubric = PSYCH_RUBRICS[id];
            output += `### SECTION: ${rubric.title} (${rubric.ref})\n`;
            
            if(appState[`q-${id}`]) output += `PROMPT CONTEXT: ${appState[`q-${id}`]}\n`;

            rubric.strands.forEach((strand, sIdx) => {
                const val = appState[`rad-${id}-s${sIdx}`];
                if(val) {
                    const opt = strand.options.find(o => o.val == val);
                    output += `- ${strand.name}: [VAL:${val}] ${opt.text.replace(/<[^>]*>?/gm, '')}\n`;
                }
            });

            if(appState[`man-${id}`]) output += `TEACHER ASSIGNED MARK: ${appState[`man-${id}`]}\n`;
            if(appState[`comm-${id}`]) output += `TEACHER COMMENT: ${appState[`comm-${id}`]}\n`;

            output += "\n-----------------------------------------------\n";
        }
    });

    if (mode === 'student') {
        output = `ACT AS AN IB PSYCHOLOGY TUTOR (SPECIALIZING IN THE 2027 FIRST ASSESSMENT GUIDE).
I am an IB student. Below is granular feedback from my teacher using the new curriculum strands.

CONTEXT:
The 2027 curriculum is concepts-driven, focusing on Content, Concepts, and Context. 
The achievement level tags [VAL:X] indicate my current position on a 1-5 level (for ERQs) or 1-3 level (for SAQs/IA).

FEEDBACK DATA PROVIDED:
${output}

TASK:
1. Identify the keywords in my current achievement levels (e.g., 'limited', 'partially', 'some').
2. Explain the "Keyword Shift" needed to move to the next markband (e.g., how to move from 'describing' to 'explaining' or 'fully explained' based strictly on 2027 standards).
3. Provide exactly 3 high-impact drafting strategies for my next iteration, anchored to the "PROMPT CONTEXT" and "TEACHER COMMENT" provided.
4. If teacher comments are brief, use the Qualitative Rubric descriptors to infer exactly what is missing from a standard top-tier response.`;
    } 
    else if (mode === 'teacher') {
        output = `ACT AS A PROFESSIONAL PEDAGOGICAL FEEDBACK FORMATTER (IB PSYCHOLOGY 2027 GUIDE). 

OBJECTIVE: Polish raw teacher shorthand and rubric data into a professional, encouraging, and formal student-facing report.

MANDATORY INSTRUCTIONS:
1. Fix all spelling, grammar, and punctuation errors in the "TEACHER COMMENT" sections.
2. NEVER change the teacher's tone, professional judgement, or core meaning.
3. Group the feedback clearly by Exam Paper / IA section.
4. PRIORITY GROWTH PLAN: Based on the strands with the lowest [VAL] tags, identify the "Top 3 Priorities" for the student. Anchor these items to the provided teacher comments.
5. If teacher comments are very brief, expand the feedback by using the qualitative language of the next higher rubric band to explain the necessary path to improvement.

FEEDBACK DATA:
${output}`;
    }

    const blob = new Blob([output], {type: "text/plain"});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `IBPsych2027_${mode}_Export.txt`;
    link.click();
}

function renderHelp() {
    document.getElementById('active-view-container').innerHTML = `
        <h1>Help & Pedagogy</h1>
        <div class="card">
            <h3>Standardized Assessment Logic</h3>
            <p><strong>Exams (Best-Fit Averaging):</strong> Following Guide pages 46-47, this tool evaluates the "balance of achievement." It identifies the average strand level and centers the markband range accordingly.</p>
            <p><strong>Internal Assessment (Summative):</strong> IA marks for the Research Proposal (Criteria A-D) are calculated summatively to provide a final score out of 24.</p>
            <h3>Pedagogical Value</h3>
            <ul>
                <li><b>The Keyword Shift:</b> Bolding keywords in the rubric helps students see the linguistic "step up" required to move from Level 2 to Level 3.</li>
                <li><b>LLM Prompting:</b> The AI exports package teacher shorthand with high-context instructions to ensure the student receives 2027-compliant tutoring.</li>
            </ul>
        </div>`;
}