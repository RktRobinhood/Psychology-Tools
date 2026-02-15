/**
 * IB Psychology 2027 Marking Tool - Engine
 * Handles UI Generation, Logic, Persistence, and Exports
 */

let appState = {};
const STORAGE_KEY = 'psych_2027_master_state';

// 1. INITIALIZATION
window.onload = () => {
    initSidebar();
    loadState();
    // Default to first section
    nav('p1a');
};

// 2. UI GENERATION
function initSidebar() {
    const container = document.getElementById('nav-container');
    let currentCat = "";
    
    // Grouping for sidebar logic
    const groups = {
        "Paper 1": ["p1a", "p1b", "p1c"],
        "Paper 2": ["p2aq1", "p2aq2", "p2aq3", "p2aq4", "p2b"],
        "Paper 3": ["p3q1", "p3q2", "p3q3", "p3q4"],
        "Internal assessment": ["ia"]
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
                <label>Question / Prompt Text</label>
                <input type="text" class="q-input" id="q-${id}" 
                    placeholder="Enter specific question text here to anchor AI feedback..." 
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
    // Handling special tool views
    if (id === 'export') {
        renderExportManager();
    } else if (id === 'help') {
        renderHelp();
    } else {
        renderRubric(id);
    }
    
    // UI Classes
    document.querySelectorAll('#sidebar a').forEach(a => a.classList.remove('active'));
    const btn = document.getElementById('btn-' + id);
    if (btn) btn.classList.add('active');
    window.scrollTo(0, 0);
}

// 4. LOGIC ENGINE
function calculateScore(id) {
    const rubric = PSYCH_RUBRICS[id];
    const display = document.getElementById('score-out');
    const title = document.getElementById('fit-title');
    const logic = document.getElementById('fit-logic');

    // Check Manual Override
    const manVal = appState[`man-${id}`];
    if (manVal && manVal !== "") {
        display.innerText = manVal;
        title.innerText = "Manual Teacher Override";
        logic.innerText = "The calculated best-fit has been bypassed by your manual entry.";
        return;
    }

    // Collect checked radio values for this ID
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
        return;
    }

    if (rubric.type === "summative") {
        display.innerText = pts;
        title.innerText = `Summative Total: ${pts} / ${rubric.maxMark}`;
        logic.innerText = "IA marks are summed across criteria A, B, C, and D.";
    } else {
        const avg = pts / count;
        if (rubric.type === "best-fit-15") {
            const ranges = ["0", "1-3", "4-6", "7-9", "10-12", "13-15"];
            const names = ["N/A", "Rudimentary", "Basic", "Satisfactory", "Good", "Excellent"];
            const idx = Math.round(avg);
            display.innerText = ranges[idx];
            title.innerText = names[idx] + " performance level";
            logic.innerText = "Centering markband based on balance of achievement across strands.";
        } else {
            // Standard SAQ logic (4m or 6m)
            const result = Math.round(avg * (rubric.maxMark / (pts/avg))); // Simplified scaling
            display.innerText = Math.round(avg * (rubric.maxMark / (rubric.strands[0].options.length))); 
            // Better simpler scaling for SAQs:
            const scaled = Math.round(avg * (rubric.maxMark / (rubric.strands[0].options.length)));
            display.innerText = scaled;
            title.innerText = avg > 1.5 ? "Strong Achievement" : "Developing Achievement";
        }
    }
}

// 5. PERSISTENCE
function saveRadio(name, val) {
    appState[name] = val;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    const id = name.split('-')[1];
    calculateScore(id);
}

function saveInput(id, val) {
    appState[id] = val;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    if (id.startsWith('man-')) {
        calculateScore(id.split('-')[1]);
    }
}

function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) appState = JSON.parse(saved);
}

function resetRubrics() {
    if (confirm("Clear all marking and comments? (Question fields will be kept for batch marking)")) {
        for (let key in appState) {
            if (!key.startsWith('q-')) delete appState[key];
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
        location.reload();
    }
}

function resetAll() {
    if (confirm("Full reset: clear all data including question prompts?")) {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
    }
}

// 6. EXPORT MANAGER
function renderExportManager() {
    const container = document.getElementById('active-view-container');
    let html = `<h1>Export Manager</h1><p class="page-desc">Select components to include. Sections with marking data are auto-selected.</p><div class="card">`;
    
    Object.keys(PSYCH_RUBRICS).forEach(id => {
        const rubric = PSYCH_RUBRICS[id];
        // Check if section is marked
        let hasMarking = false;
        rubric.strands.forEach((_, sIdx) => { if(appState[`rad-${id}-s${sIdx}`]) hasMarking = true; });
        if(appState[`comm-${id}`] && appState[`comm-${id}`].trim() !== "") hasMarking = true;
        if(appState[`man-${id}`]) hasMarking = true;

        html += `
            <div class="export-row ${!hasMarking ? 'disabled' : ''}">
                <input type="checkbox" id="chk-${id}" ${hasMarking ? 'checked' : ''}>
                <label>${rubric.title}</label>
            </div>`;
    });

    html += `</div><div style="display:flex; flex-direction:column; gap:10px;">
        <button class="btn btn-blue" onclick="doExport('simple')">Download Simple Feedback (.txt)</button>
        <button class="btn btn-green" onclick="doExport('student')">Generate AI Student Tutor Prompt</button>
        <button class="btn btn-purple" onclick="doExport('teacher')">Generate AI Teacher Report Prompt</button>
    </div>`;
    container.innerHTML = html;
}

function doExport(mode) {
    let dataText = "IB PSYCHOLOGY 2027 ASSESSMENT REPORT\n======================================\n\n";
    
    Object.keys(PSYCH_RUBRICS).forEach(id => {
        const chk = document.getElementById(`chk-${id}`);
        if (chk && chk.checked) {
            const rubric = PSYCH_RUBRICS[id];
            dataText += `SECTION: ${rubric.title}\n`;
            
            const qVal = appState[`q-${id}`];
            if(qVal) dataText += `QUESTION CONTEXT: ${qVal}\n`;

            rubric.strands.forEach((strand, sIdx) => {
                const val = appState[`rad-${id}-s${sIdx}`];
                if(val) {
                    const opt = strand.options.find(o => o.val == val);
                    dataText += `- ${strand.name}: [LEVEL ${val}] ${opt.text.replace(/<[^>]*>?/gm, '')}\n`;
                }
            });

            const manVal = appState[`man-${id}`];
            if(manVal) dataText += `TEACHER ASSIGNED MARK: ${manVal}\n`;

            const commVal = appState[`comm-${id}`];
            if(commVal) dataText += `TEACHER SPECIFIC COMMENTS: ${commVal}\n`;

            dataText += "\n---\n";
        }
    });

    let finalBody = dataText;

    if (mode === 'student') {
        finalBody = `ACT AS AN IB PSYCHOLOGY TUTOR (FIRST ASSESSMENT 2027 GUIDE). 
I am a student. Below is granular feedback from my teacher.

FEEDBACK DATA:
${dataText}

INSTRUCTIONS:
1. Identify the keywords in my current achievement levels (e.g., 'limited', 'partially', 'some').
2. Explain the "Keyword Shift" needed to move to the next level (e.g., how to move from 'describing' to 'explaining' based on 2027 standards).
3. Provide 3 specific strategies for my next draft, anchored to the "QUESTION CONTEXT" provided.
4. If teacher comments are brief, use the rubric descriptors to infer what is missing.`;
    } else if (mode === 'teacher') {
        finalBody = `ACT AS A PROFESSIONAL PEDAGOGICAL FEEDBACK PROCESSOR (IB PSYCHOLOGY 2027 GUIDE). 

OBJECTIVE: Polishing teacher shorthand into a formal student report.

INSTRUCTIONS:
1. Fix all spelling/grammar in "TEACHER SPECIFIC COMMENTS" but DO NOT alter the tone, professional judgement, or core meaning.
2. Group the data into a professional report.
3. PRIORITY PLAN: Identify the Top 3 areas for growth based on the lowest scoring [LEVEL] strands. 
4. If teacher comments are brief, use the verbatim qualitative language of the next higher rubric band to explain what is needed for improvement.

DATA:
${dataText}`;
    }

    const blob = new Blob([finalBody], {type: "text/plain"});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `IBPsych2027_${mode}_Export.txt`;
    link.click();
}

function renderHelp() {
    const container = document.getElementById('active-view-container');
    container.innerHTML = `
        <h1>Help & Pedagogy</h1>
        <div class="card">
            <h3>The Best-Fit Model</h3>
            <p>This tool uses <b>Independent Strand Assessment</b>. Instead of selecting a holistic paragraph, you grade individual strands (Knowledge, Analysis, etc.). The tool identifies the "center of gravity" of a student's performance, ensuring they are rewarded for specific strengths even if other areas are developing.</p>
            <h3>Export Options</h3>
            <ul>
                <li><b>Simple Feedback:</b> A verbatim log of achievement for internal records or formal reporting.</li>
                <li><b>Student AI Prompt:</b> Packages feedback into a "Tutor Prompt." Students use this with an AI to understand the <b>Keyword Shift</b> (e.g. turning an AO1 'description' into an AO3 'explanation').</li>
                <li><b>Teacher AI Prompt:</b> Instructs AI to polish your raw notes into a professional report, fixing typos while preserving your "voice" and identifying high-ROI growth targets.</li>
            </ul>
        </div>
    `;
}