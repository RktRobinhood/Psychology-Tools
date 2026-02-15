/**
 * IB Psychology 2027 Marking Tool - Logic Engine
 * Robust Midpoint Averaging, Logic Tooltips, and High-Context AI Prompts
 */

let appState = {};
const STORAGE_KEY = 'psych_2027_vFinal_Robust_Modular';
const EXAM_ORDER = ['p1a', 'p1b', 'p1c', 'p2aq1', 'p2aq2', 'p2aq3', 'p2aq4', 'p2b', 'p3q1', 'p3q2', 'p3q3', 'p3q4', 'ia'];

// 1. INITIALIZATION
window.onload = () => {
    initSidebar();
    loadState();
    nav('p1a'); // Start at first section
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
                <label>Question / Prompt Text</label>
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

// 4. LOGIC ENGINE (ROBUST MIDPOINT CALCULATION)
function upd(id) {
    const r = PSYCH_RUBRICS[id];
    const out = document.getElementById('score-out');
    const tit = document.getElementById('fit-title');
    const logicDisplay = document.getElementById('fit-logic');

    // Case A: Manual Override
    if(appState[`man-${id}`] && appState[`man-${id}`] !== "") { 
        out.innerText = appState[`man-${id}`]; 
        tit.innerText = "Manual Override"; 
        logicDisplay.innerText = `Bypassed Best-Fit logic. Teacher manually assigned ${appState[`man-${id}`]}/${r.maxMark}.`;
        save(); return; 
    }

    // Case B: Calculate from Strands
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
        // IA Logic: Summing midpoints directly (marks 1-6 per criteria)
        const finalSum = Math.round(sumMids);
        out.innerText = finalSum;
        tit.innerText = `Summative Total`;
        logicDisplay.innerText = `IA SUMMATIVE LOGIC: Each criterion is marked independently. Total mark is the sum of Criteria A-D midpoints: ${sumMids.toFixed(1)} rounded to ${finalSum}/24.`;
    } else {
        // Exam Logic: Averaging Midpoints of Markbands
        const finalMark = Math.round(meanMark);
        out.innerText = finalMark;
        tit.innerText = getBandName(id, finalMark);
        logicDisplay.innerText = `BEST-FIT LOGIC: The center of gravity for marked strands is ${meanMark.toFixed(2)} (the mean of selected band midpoints). This rounds to a final mark of ${finalMark}/${r.maxMark}.`;
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
function resetRubrics() { if(confirm("Keep questions, but clear all current markings and comments?")) { for(let k in appState) if(!k.startsWith('q-')) delete appState[k]; save(); location.reload(); }}
function resetAll() { if(confirm("Full wipe of all fields?")) { localStorage.removeItem(STORAGE_KEY); location.reload(); }}

// 6. EXPORT MANAGER
function renderExportManager() {
    const container = document.getElementById('active-view-container');
    let html = `<h1>Export Manager</h1><p class="page-desc">Check components to include. Hierarchy matches Sidebar precisely.</p><div class="card">`;
    
    EXAM_ORDER.forEach(id => {
        const rubric = PSYCH_RUBRICS[id];
        let hasMarking = false;
        rubric.strands.forEach((_, sIdx) => { if(appState[`rad-${id}-s${sIdx}`]) hasMarking = true; });
        if(appState[`comm-${id}`] && appState[`comm-${id}`].trim() !== "") hasMarking = true;
        if(appState[`man-${id}`]) hasMarking = true;

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
    let contextHeader = `SYSTEM CONTEXT: FIRST ASSESSMENT 2027 IB PSYCHOLOGY GUIDE
======================================================
This data adheres strictly to the 2027 curriculum.
- Concepts, Content, and Context are the driving pillars.
- AO1: Knowledge & Understanding
- AO2: Application of Knowledge
- AO3: Synthesis & Critical Analysis
- Best-Fit Marking: Evaluated via strand midpoints.
======================================================\n\n`;

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
                    dataBody += `- ${strand.name}: ACHIEVEMENT BAND ${opt.label} [Numerical Level ${val}]\n  Verbatim Guide Text: ${opt.text.replace(/<[^>]*>?/gm, '')}\n`;
                }
            });

            // Find current mark to export
            let pts = 0, count = 0;
            r.strands.forEach((_, i) => { if(appState[`rad-${id}-s${i}`]) { 
                const opt = r.strands[i].options.find(o => o.val == appState[`rad-${id}-s${i}`]);
                pts += opt.mid; count++; 
            }});
            const mark = appState[`man-${id}`] || Math.round(pts/count);

            dataBody += `[NUMERICAL MARK ASSIGNED]: ${mark}/${r.maxMark}\n`;
            if(appState[`comm-${id}`]) dataBody += `[TEACHER COMMENTS]: ${appState[`comm-${id}`]}\n`;
            dataBody += "\n---\n";
        }
    });

    let finalPrompt = "";
    if (mode === 'simple') { finalPrompt = dataBody; }
    else if (mode === 'student') {
        finalPrompt = `${contextHeader}ACT AS AN IB PSYCHOLOGY TUTOR (2027 GUIDE). Identify the "Keyword Shift" (e.g. how to turn a 'described' study into an 'explained' link to the prompt) required to improve my draft based on this feedback:\n\n${dataBody}`;
    } else {
        finalPrompt = `${contextHeader}ACT AS A FORMAL PEDAGOGICAL FEEDBACK PROCESSOR (IB PSYCHOLOGY 2027 GUIDE). 
1. Fix grammar/typos in Teacher Comments without altering judgement or tone.
2. Group feedback professionally.
3. Identify TOP 3 priority improvements for the student based on the lowest mark sections.
4. If comments are brief, expand them using the verbatim qualitative descriptors provided.\n\nDATA:\n${dataBody}`;
    }

    const blob = new Blob([finalPrompt], {type: "text/plain"});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `IBPsych2027_${mode}.txt`;
    link.click();
}

function renderHelp() {
    document.getElementById('active-view-container').innerHTML = `<h1>Help & Pedagogy</h1><div class="card"><h3>Approach</h3><p>This tool uses <b>independent strand assessment</b>. IA sums midpoints (out of 24); Exams average midpoints for a robust Best-Fit estimate.</p></div>`;
}