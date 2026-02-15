/**
 * IB Psychology 2027 Marking Tool - Logic Engine
 * High-Context Edition: Best-Fit Logic, Manual Overrides, and AI System Prompts
 */

let appState = {};
const STORAGE_KEY = 'psych_2027_vFinal_Robust_State';
// Precise order for sidebar and export matching the 2027 Guide
const EXAM_ORDER = ['p1a', 'p1b', 'p1c', 'p2aq1', 'p2aq2', 'p2aq3', 'p2aq4', 'p2b', 'p3q1', 'p3q2', 'p3q3', 'p3q4', 'ia'];

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
                    placeholder="Enter specific question text here to anchor AI context..." 
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
                <label>Manual Mark Priority (Override Logic)</label>
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
    if (id === 'export') renderExportManager();
    else if (id === 'help') renderHelp();
    else renderRubric(id);
    
    document.querySelectorAll('#sidebar a').forEach(a => a.classList.remove('active'));
    const btn = document.getElementById('btn-' + id);
    if (btn) btn.classList.add('active');
    window.scrollTo(0, 0);
}

// 4. THE ENGINE: MATHEMATICAL BEST-FIT & SUMMATIVE LOGIC
function calculateScore(id) {
    const rubric = PSYCH_RUBRICS[id];
    const display = document.getElementById('score-out');
    const title = document.getElementById('fit-title');
    const logicDisplay = document.getElementById('fit-logic');

    // Case A: Manual Entry takes precedence
    const manVal = appState[`man-${id}`];
    if (manVal && manVal !== "") {
        display.innerText = manVal;
        title.innerText = "Manual Override Active";
        logicDisplay.innerText = `Mathematical Best-Fit has been bypassed. Teacher has manually assigned ${manVal}/${rubric.maxMark}.`;
        save();
        return;
    }

    // Collect levels selected for this component
    let pts = 0;
    let count = 0;
    rubric.strands.forEach((_, sIdx) => {
        const val = appState[`rad-${id}-s${sIdx}`];
        if (val) { pts += parseFloat(val); count++; }
    });

    if (count === 0) {
        display.innerText = "0";
        title.innerText = "Select descriptors...";
        logicDisplay.innerText = "Awaiting selection of strands to calculate achievement level.";
        return;
    }

    let avgLevel = pts / count;

    // Logic for IA Research Proposal (Summative - Sum of Criteria A-D)
    if (rubric.type === "summative") {
        display.innerText = pts;
        title.innerText = `Summative Mark: ${pts} / 24`;
        logicDisplay.innerText = `IA SUMMATIVE LOGIC: Total achievement is the sum of Criteria A-D levels. [A+B+C+D = ${pts} marks]`;
    } 
    // Logic for 15-Mark ERQs (P1C, P2B, P3Q4)
    else if (rubric.type === "best-fit-15") {
        const bands = ["0", "1-3", "4-6", "7-9", "10-12", "13-15"];
        const names = ["N/A", "Rudimentary", "Basic", "Satisfactory", "Good", "Excellent"];
        let bandIdx = Math.round(avgLevel);
        
        // Mark Refinement Logic: Interpolate exact mark within the 3-point band based on decimal avg level
        // Formula: (Band Index * 3) - (3 - Round(Decimal * 3))
        let refinedMark = (bandIdx * 3) - (3 - Math.round((avgLevel % 1 || (avgLevel == bandIdx ? 1 : 0)) * 3));
        if (bandIdx == 0) refinedMark = 0;

        display.innerText = `${bands[bandIdx]} (${refinedMark})`;
        title.innerText = `${names[bandIdx]} Performance Level`;
        logicDisplay.innerText = `BEST-FIT LOGIC: Mean achievement level across ${count} strands is ${avgLevel.toFixed(2)}. Based on 2027 'Balance of Achievement' rules, this centers the performance in the ${bands[bandIdx]} range, specifically mapping to ${refinedMark}/15 marks.`;
    } 
    // Logic for 4m and 6m SAQs
    else {
        let finalMark = Math.round(avgLevel * (rubric.maxMark / rubric.levels));
        display.innerText = finalMark;
        title.innerText = avgLevel > (rubric.levels/2) ? "Detailed Achievement" : "Developing Achievement";
        logicDisplay.innerText = `SCALING LOGIC: Mean level ${avgLevel.toFixed(2)} scaled against ${rubric.levels} levels to section max of ${rubric.maxMark}. Final calculated mark: ${finalMark}.`;
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

function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(appState)); }

function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) appState = JSON.parse(saved);
}

function resetRubrics() {
    if (confirm("Keep question prompts, but clear all current student marks and comments?")) {
        for (let key in appState) { if (!key.startsWith('q-')) delete appState[key]; }
        save(); location.reload();
    }
}

function resetAll() {
    if (confirm("Full wipe: Clear every field including question prompts?")) {
        localStorage.removeItem(STORAGE_KEY); location.reload();
    }
}

// 6. EXPORT MANAGER
function renderExportManager() {
    const container = document.getElementById('active-view-container');
    let html = `<h1>Export Manager</h1><p class="page-desc">The following components contain marking data. Deselect any to exclude from draft.</p><div class="card">`;
    
    EXAM_ORDER.forEach(id => {
        const rubric = PSYCH_RUBRICS[id];
        let hasData = appState[`man-${id}`] || (appState[`comm-${id}`] && appState[`comm-${id}`].trim() !== "");
        rubric.strands.forEach((_, i) => { if(appState[`rad-${id}-s${i}`]) hasData = true; });

        html += `
            <div class="export-row ${!hasData ? 'disabled' : ''}">
                <input type="checkbox" id="chk-${id}" ${hasData ? 'checked' : ''}>
                <label style="font-weight:bold">${rubric.title}</label>
            </div>`;
    });

    html += `</div><div style="display:flex; flex-direction:column; gap:10px;">
        <button class="btn btn-blue" onclick="doExport('simple')">Download Simple Feedback (.txt)</button>
        <button class="btn btn-green" onclick="doExport('student')">Generate High-Context AI Student Prompt</button>
        <button class="btn btn-purple" onclick="doExport('teacher')">Generate High-Context AI Teacher Formatter</button>
    </div>`;
    container.innerHTML = html;
}

function doExport(mode) {
    // START OF HIGH-CONTEXT SYSTEM PROMPT FOR LLM
    let contextHeader = `SYSTEM CONTEXT: FIRST ASSESSMENT 2027 CURRICULUM
======================================================
This data is based strictly on the 2027 IB Psychology Guide. 
Key Differences from 2019 Guide:
1. P1 Section B is 'Applied' (linking approach to unseen scenario).
2. P2 Section A focus is 'Class Practicals' (Design, Knowledge, Compare, Application).
3. Best-Fit is calculated by averaging strand-levels, not total marks.
4. AO3 (Synthesis/Evaluation) requires explicit links between Concepts, Content, and Context.
======================================================\n\n`;

    let dataBody = "";
    EXAM_ORDER.forEach(id => {
        const chk = document.getElementById(`chk-${id}`);
        if (chk && chk.checked) {
            const rubric = PSYCH_RUBRICS[id];
            dataBody += `### COMPONENT: ${rubric.title} (${rubric.ref})\n`;
            if(appState[`q-${id}`]) dataBody += `[QUESTION/PROMPT]: ${appState[`q-${id}`]}\n`;

            rubric.strands.forEach((strand, sIdx) => {
                const val = appState[`rad-${id}-s${sIdx}`];
                if(val) {
                    const opt = strand.options.find(o => o.val == val);
                    dataBody += `- ${strand.name}: ACHIEVEMENT LEVEL ${val} (out of ${rubric.levels})\n  VERBATIM DESCRIPTOR: ${opt.text.replace(/<[^>]*>?/gm, '')}\n`;
                }
            });

            if(appState[`man-${id}`]) dataBody += `[TEACHER ASSIGNED MARK]: ${appState[`man-${id}`]}/${rubric.maxMark}\n`;
            if(appState[`comm-${id}`]) dataBody += `[TEACHER QUALITATIVE COMMENTS]: ${appState[`comm-${id}`]}\n`;
            dataBody += "\n---\n";
        }
    });

    let finalPrompt = "";

    if (mode === 'simple') {
        finalPrompt = dataBody;
    } else if (mode === 'student') {
        finalPrompt = `${contextHeader}ACT AS AN IB PSYCHOLOGY TUTOR SPECIALIZING IN THE 2027 GUIDE.
I am a student. The feedback provided below uses granular achievement levels.

TASK:
1. Explain the "Keyword Shift" (e.g., how to turn a 'described' study into an 'explained' link to the prompt) for my marked sections.
2. Provide 3 High-Impact strategies anchored specifically to my [QUESTION/PROMPT] context and [TEACHER QUALITATIVE COMMENTS].
3. FALLBACK: If teacher comments are brief, look at my [ACHIEVEMENT LEVEL] tags and use the verbatim descriptors to tell me exactly what logic or evidence is currently missing.

DATA:
${dataBody}`;
    } else if (mode === 'teacher') {
        finalPrompt = `${contextHeader}ACT AS A PROFESSIONAL ASSESSMENT PROCESSOR (IB PSYCHOLOGY 2027 GUIDE). 

TASK:
Transform this raw marking data into a polished, formal student-facing feedback report.

CONSTRAINTS:
1. FIX spelling/grammar in teacher comments but NEVER change professional tone or judgement.
2. If comments are sparse, use the [ACHIEVEMENT LEVEL] data to expand the report using Guide-compliant language.
3. PRIORITY PLAN: Based on the lowest mark sections, identify the 3 highest-ROI areas for student improvement.

DATA:
${dataBody}`;
    }

    const blob = new Blob([finalPrompt], {type: "text/plain"});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Psych2027_${mode}_Prompt.txt`;
    link.click();
}

function renderHelp() {
    document.getElementById('active-view-container').innerHTML = `
        <h1>Help & Pedagogy</h1>
        <div class="card">
            <h3>2027 Assessment Logic</h3>
            <p>Following Guide pages 46-47, this tool evaluates the "balance of achievement." It calculates a Best-Fit center based on selected strands for exams, while summing Criteria A-D for the IA Proposal.</p>
            <h3>Export Modes</h3>
            <p><b>Student Prompt:</b> Packages feedback into a system-instruction for an LLM to tutor the student on draft improvements.</p>
            <p><b>Teacher Formatter:</b> Processes shorthand and typos into a formal report with a priority growth plan.</p>
        </div>`;
}