/**
 * IB Psychology 2027 Marking Tool - Logic Engine
 * High-Context Edition: Best-Fit Logic, Manual Overrides, and AI System Prompts
 */

let appState = {};
const STORAGE_KEY = 'psych_2027_master_vFinal_Robust_Modular';
const EXAM_ORDER = ['p1a', 'p1b', 'p1c', 'p2aq1', 'p2aq2', 'p2aq3', 'p2aq4', 'p2b', 'p3q1', 'p3q2', 'p3q3', 'p3q4', 'ia'];

// 1. INITIALIZATION
window.onload = () => {
    initSidebar();
    loadState();
    nav('p1a'); 
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
                <label>Manual Mark Entry (Priority Override)</label>
                <input type="number" class="manual-grade-field" id="man-${id}" 
                    value="${manVal}" oninput="saveInput('man-${id}', this.value)">
            </div>
            <textarea id="comm-${id}" placeholder="Comment" oninput="saveInput('comm-${id}', this.value)">${commVal}</textarea>
        </div>`;

    container.innerHTML = html;
    upd(id);
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

// 4. LOGIC ENGINE
function upd(id) {
    const r = PSYCH_RUBRICS[id];
    const out = document.getElementById('score-out');
    const tit = document.getElementById('fit-title');
    const logicDisplay = document.getElementById('fit-logic');

    if(appState[`man-${id}`] && appState[`man-${id}`] !== "") { 
        out.innerText = appState[`man-${id}`]; 
        tit.innerText = "Manual Override"; 
        logicDisplay.innerText = `Bypassed Best-Fit logic. Teacher manually assigned ${appState[`man-${id}`]}/${r.maxMark}.`;
        save(); return; 
    }

    let sumMids = 0, count = 0;
    r.strands.forEach((strand, i) => { 
        const selectedVal = appState[`rad-${id}-s${i}`];
        if(selectedVal) {
            const opt = strand.options.find(o => o.val == selectedVal);
            sumMids += opt.mid;
            count++;
        }
    });

    if (count === 0) { out.innerText = "0"; tit.innerText = "Select descriptors..."; return; }
    const meanMark = sumMids / count;

    if (r.type === "summative") {
        const finalSum = Math.round(sumMids);
        out.innerText = finalSum;
        tit.innerText = `Summative Total`;
        logicDisplay.innerText = `IA SUMMATIVE LOGIC: Criteria A-D marked independently. Total mark is sum of midpoints: ${sumMids.toFixed(1)} rounded to ${finalSum}/24.`;
    } else {
        const finalMark = Math.round(meanMark);
        out.innerText = finalMark;
        tit.innerText = getBandName(id, finalMark);
        logicDisplay.innerText = `BEST-FIT LOGIC: The center of performance is ${meanMark.toFixed(2)} (mean of selected band midpoints). Rounding to ${finalMark}/${r.maxMark}.`;
    }
    save();
}

function getBandName(id, mark) {
    const r = PSYCH_RUBRICS[id];
    if(r.type === "best-fit-15") {
        if(mark >= 13) return "Excellent";
        if(mark >= 10) return "Good";
        if(mark >= 7) return "Satisfactory";
        if(mark >= 4) return "Basic";
        if(mark >= 1) return "Rudimentary";
    }
    return mark > (r.maxMark/2) ? "Strong Performance" : "Developing Performance";
}

// 5. PERSISTENCE
function saveRadio(n, v) { appState[n] = v; save(); upd(n.split('-')[1]); }
function saveInput(id, v) { appState[id] = v; save(); if(id.startsWith('man-')) upd(id.split('-')[1]); }
function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(appState)); }
function loadState() { const s = localStorage.getItem(STORAGE_KEY); if(s) appState = JSON.parse(s); }
function resetRubrics() { if(confirm("Keep questions, clear marks/comments?")) { for(let k in appState) if(!k.startsWith('q-')) delete appState[k]; save(); location.reload(); }}
function resetAll() { if(confirm("Full wipe?")) { localStorage.removeItem(STORAGE_KEY); location.reload(); }}

// 6. EXPORT MANAGER
function renderExportManager() {
    const container = document.getElementById('active-view-container');
    let html = `<h1>Export Manager</h1><p class="page-desc">Data-less sections are excluded from selection by default.</p><div class="card">`;
    EXAM_ORDER.forEach(id => {
        const rubric = PSYCH_RUBRICS[id];
        let hasData = appState[`man-${id}`] || (appState[`comm-${id}`] && appState[`comm-${id}`].trim() !== "");
        rubric.strands.forEach((_, i) => { if(appState[`rad-${id}-s${i}`]) hasData = true; });
        html += `<div class="export-row ${!hasData ? 'disabled' : ''}"><input type="checkbox" id="chk-${id}" ${hasData ? 'checked' : ''}><label style="font-weight:bold">${rubric.title}</label></div>`;
    });
    html += `</div><div style="display:flex; flex-direction:column; gap:10px;">
        <button class="btn btn-blue" onclick="doExport('simple')">Download Simple Feedback (.txt)</button>
        <button class="btn btn-green" onclick="doExport('student')">Generate AI Student Tutor Prompt</button>
        <button class="btn btn-purple" onclick="doExport('teacher')">Generate AI Teacher Formatter Prompt</button>
    </div>`;
    container.innerHTML = html;
}

function doExport(mode) {
    let contextHeader = `SYSTEM CONTEXT: FIRST ASSESSMENT 2027 IB PSYCHOLOGY GUIDE\n======================================================\nAdhere strictly to 2027 standards (AO1/AO2/AO3 focus).\n======================================================\n\n`;
    let dataBody = "";
    EXAM_ORDER.forEach(id => {
        const chk = document.getElementById(`chk-${id}`);
        if (chk && chk.checked) {
            const r = PSYCH_RUBRICS[id];
            dataBody += `### COMPONENT: ${r.title}\n`;
            if(appState[`q-${id}`]) dataBody += `[QUESTION/PROMPT]: ${appState[`q-${id}`]}\n`;
            r.strands.forEach((strand, i) => {
                const val = appState[`rad-${id}-s${i}`];
                if(val) {
                    const opt = strand.options.find(o => o.val == val);
                    dataBody += `- ${strand.name}: ACHIEVEMENT BAND ${opt.label} [Numerical Level ${val}]\n  Descriptor: ${opt.text.replace(/<[^>]*>?/gm, '')}\n`;
                }
            });
            let pts = 0, count = 0;
            r.strands.forEach((_, i) => { if(appState[`rad-${id}-s${i}`]) { const opt = r.strands[i].options.find(o => o.val == appState[`rad-${id}-s${i}`]); pts += opt.mid; count++; }});
            const mark = appState[`man-${id}`] || Math.round(pts/count);
            dataBody += `[NUMERICAL MARK ASSIGNED]: ${mark}/${r.maxMark}\n`;
            if(appState[`comm-${id}`]) dataBody += `[TEACHER COMMENTS]: ${appState[`comm-${id}`]}\n`;
            dataBody += "\n---\n";
        }
    });

    let finalPrompt = (mode==='simple') ? dataBody : (mode==='student') ? 
        `${contextHeader}ACT AS AN IB PSYCHOLOGY TUTOR (2027 GUIDE). Student Feedback follows. Explain the "Keyword Shift" and provide 3 strategies.\n\n${dataBody}` :
        `${contextHeader}ACT AS A FORMAL PEDAGOGICAL FEEDBACK PROCESSOR. Fix shorthand/typos, group professionally, and identity TOP 3 growth priorities.\n\n${dataBody}`;

    const blob = new Blob([finalPrompt], {type: "text/plain"});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `IBPsych2027_${mode}_Export.txt`;
    link.click();
}

// 7. RESTORED & EXPANDED HELP SECTION
function renderHelp() {
    document.getElementById('active-view-container').innerHTML = `
        <h1>Help & Pedagogy</h1>
        
        <div class="card">
            <span class="strand-title">1. The 2027 Best-Fit Philosophy</span>
            <p>Following the <b>IB Psychology Guide (First Assessment 2027)</b> pages 46-47, assessment is <i>criterion-related</i> and uses a "best-fit" model. This tool moves away from holistic picking by allowing you to mark individual <b>Strands</b> (e.g., Knowledge, Analysis, Terminology).</p>
            <p>The engine calculates the <b>Mean Midpoint</b> of your selections. This ensures that if a student is "Excellent" in Knowledge but "Basic" in Analysis, the tool identifies the mathematical "center of gravity" of their performance, landing them in the most statistically accurate markband.</p>
        </div>

        <div class="card">
            <span class="strand-title">2. Linguistic "Step-Up" Logic</span>
            <p>A core feature of this tool is the <b>Keyword Highlighting</b>. In the 2027 curriculum, the jump between markbands is defined by specific command terms and qualifiers:</p>
            <ul>
                <li><b>Level 2 (4-6):</b> Knowledge is <span class="kw">described</span>.</li>
                <li><b>Level 3 (7-9):</b> Knowledge is <span class="kw">partly explained</span>.</li>
                <li><b>Level 5 (13-15):</b> Knowledge is <span class="kw">fully explained</span>.</li>
            </ul>
            <p>By bolding these terms, teachers can show students exactly which linguistic "shift" is required to move to the next level.</p>
        </div>

        <div class="card">
            <span class="strand-title">3. Export Utility Guide</span>
            <p>The Export Manager provides three distinct workflows:</p>
            <ul>
                <li><b>Simple Feedback:</b> Generates a verbatim log of achievement. Ideal for internal tracking or copy-pasting into school reporting systems.</li>
                <li><b>Student AI Prompt:</b> Designed for students to use with an LLM (like ChatGPT). It instructs the AI to act as a 2027-specific tutor, explaining how to bridge the gap between their current keywords and the next level.</li>
                <li><b>Teacher AI Prompt:</b> Designed for teachers. It polishes raw shorthand and fixes typos without altering professional judgement. It automatically identifies the <b>3 High-ROI Priorities</b> based on the student's lowest scoring strands.</li>
            </ul>
        </div>

        <div class="card">
            <span class="strand-title">4. Batch Marking Workflow</span>
            <p>To mark a full class efficiently:</p>
            <ol>
                <li>Enter the <b>Question Text</b> for the prompt (this anchors the AI logic).</li>
                <li>Mark the student using the radio buttons and add specific comments.</li>
                <li>Export the data.</li>
                <li>Click <b>"Reset Student Marking"</b>. This wipes the rubrics and comments but <b>keeps the question text</b> fixed, so you don't have to re-enter it for the next student.</li>
            </ol>
        </div>
    `;
}
