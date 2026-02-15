/**
 * IB Psychology 2027 Verbatim Rubric Data
 * No truncation. Verbatim from Guide Pages 51-65.
 * Keywords for 'Step-Up' are wrapped in <span class="kw">.
 */

const PSYCH_RUBRICS = {
    // --- PAPER 1: CORE ---
    "p1a": {
        id: "p1a",
        title: "P1-A: Short-answer questions (SAQs)",
        ref: "Guide Page 51",
        type: "average",
        maxMark: 4,
        strands: [
            {
                name: "Knowledge and understanding",
                options: [
                    { val: 1, label: "1-2", text: "The response demonstrates <span class='kw'>limited knowledge</span> relevant to the question." },
                    { val: 2, label: "3-4", text: "The response demonstrates <span class='kw'>detailed knowledge</span> relevant to the question." }
                ]
            },
            {
                name: "Application of example",
                options: [
                    { val: 1, label: "1-2", text: "The example is relevant but is <span class='kw'>not explained</span>." },
                    { val: 2, label: "3-4", text: "The example is relevant and <span class='kw'>explained</span>." }
                ]
            }
        ]
    },
    "p1b": {
        id: "p1b",
        title: "P1-B: Applied short-answer questions",
        ref: "Guide Page 51-52",
        type: "average",
        maxMark: 6,
        strands: [
            {
                name: "Knowledge and understanding",
                options: [
                    { val: 1, label: "1-2", text: "Knowledge and understanding of the question are <span class='kw'>limited</span>." },
                    { val: 2, label: "3-4", text: "Knowledge and understanding have <span class='kw'>some detail</span> and are mostly accurate." },
                    { val: 3, label: "5-6", text: "Knowledge and understanding are <span class='kw'>accurate and detailed</span>." }
                ]
            },
            {
                name: "Application of knowledge",
                options: [
                    { val: 1, label: "1-2", text: "The application of knowledge is relevant but <span class='kw'>limited</span>." },
                    { val: 2, label: "3-4", text: "The application of knowledge is relevant and <span class='kw'>partially developed</span>." },
                    { val: 3, label: "5-6", text: "The application of relevant knowledge is <span class='kw'>well developed</span>." }
                ]
            }
        ]
    },
    "p1c": {
        id: "p1c",
        title: "P1-C: Concept-based ERQs (Essay)",
        ref: "Guide Page 52-53",
        type: "best-fit-15",
        maxMark: 15,
        strands: [
            {
                name: "Understanding Demands & Knowledge",
                options: [
                    { val: 1, label: "1-3", text: "The response indicates <span class='kw'>little understanding</span> of the demands of the question. Knowledge and understanding are <span class='kw'>very limited</span> and contain inaccuracies." },
                    { val: 2, label: "4-6", text: "The response indicates <span class='kw'>some understanding</span> of the demands of the question. Relevant knowledge and understanding are <span class='kw'>described</span>." },
                    { val: 3, label: "7-9", text: "Understanding of the demands are <span class='kw'>partially addressed</span>. Relevant knowledge and understanding are <span class='kw'>partly explained</span>." },
                    { val: 4, label: "10-12", text: "The demands of the question are <span class='kw'>addressed</span>. Relevant knowledge and understanding are <span class='kw'>mostly explained</span>." },
                    { val: 5, label: "13-15", text: "The demands of the question are <span class='kw'>fully explained</span>. Relevant knowledge and understanding are <span class='kw'>fully explained</span>." }
                ]
            },
            {
                name: "Critical Analysis & Synthesis",
                options: [
                    { val: 1, label: "1-3", text: "Any analysis present is <span class='kw'>superficial or incoherent</span>. Links are not stated or not relevant." },
                    { val: 2, label: "4-6", text: "There is <span class='kw'>limited analysis</span> present and overall the response is <span class='kw'>more descriptive</span> than it is analytical." },
                    { val: 3, label: "7-9", text: "The response contains analysis, although this <span class='kw'>lacks development</span>. Links are <span class='kw'>partly relevant</span>." },
                    { val: 4, label: "10-12", text: "The response contains critical analysis, although this <span class='kw'>lacks development</span>. Links are included and <span class='kw'>explained</span>." },
                    { val: 5, label: "13-15", text: "The response contains <span class='kw'>well-developed critical analysis</span>. Links between area of study and concept are <span class='kw'>fully explained</span>." }
                ]
            },
            {
                name: "Terminology & Conclusion",
                options: [
                    { val: 1, label: "1-3", text: "Terminology is <span class='kw'>not used</span> or used inappropriately. Conclusion is <span class='kw'>missing or not consistent</span>." },
                    { val: 2, label: "4-6", text: "Terminology is used, but <span class='kw'>often inappropriately</span>. A <span class='kw'>simplistic conclusion</span> is included." },
                    { val: 3, label: "7-9", text: "Terminology used <span class='kw'>sometimes appropriately</span>. Conclusion included but is <span class='kw'>not always consistent</span> with the argument." },
                    { val: 4, label: "10-12", text: "Terminology used <span class='kw'>mostly appropriately</span>. The response argues to a conclusion that is <span class='kw'>consistent</span>." },
                    { val: 5, label: "13-15", text: "There is <span class='kw'>accurate and precise</span> use of terminology. The response argues to a <span class='kw'>reasoned and clearly stated</span> conclusion." }
                ]
            }
        ]
    },

    // --- PAPER 2: OPTIONS ---
    "p2aq1": {
        id: "p2aq1",
        title: "P2-A-Q1: Knowledge of research methodology",
        ref: "Guide Page 53",
        type: "average",
        maxMark: 4,
        strands: [
            {
                name: "Methodological Knowledge",
                options: [
                    { val: 1, label: "1-2", text: "The response demonstrates <span class='kw'>limited knowledge</span> of the research methodology relevant to the class practical. Terminology is limited or inaccurate." },
                    { val: 2, label: "3-4", text: "The response demonstrates <span class='kw'>detailed knowledge</span> and understanding of research methodology. Terminology is <span class='kw'>used accurately</span>." }
                ]
            }
        ]
    },
    "p2aq2": {
        id: "p2aq2",
        title: "P2-A-Q2: Application to class practical",
        ref: "Guide Page 53",
        type: "average",
        maxMark: 4,
        strands: [
            {
                name: "Conceptual Application",
                options: [
                    { val: 1, label: "1-2", text: "Knowledge and understanding are <span class='kw'>relevant but limited</span>. There are <span class='kw'>some relevant links</span> between concept and practical." },
                    { val: 2, label: "3-4", text: "Knowledge and understanding of the concept are <span class='kw'>well developed</span>. There are <span class='kw'>clear and detailed links</span> back to the practical." }
                ]
            }
        ]
    },
    "p2aq3": {
        id: "p2aq3",
        title: "P2-A-Q3: Compare and contrast",
        ref: "Guide Page 53-54",
        type: "average",
        maxMark: 6,
        strands: [
            {
                name: "Methodological Comparison",
                options: [
                    { val: 1, label: "1-2", text: "Similarities or differences are <span class='kw'>described in limited detail</span> or contain errors. Limited terminology used." },
                    { val: 2, label: "3-4", text: "Similarities and differences are <span class='kw'>explained in limited detail</span> and may lack clarity OR either is <span class='kw'>discussed in detail</span>." },
                    { val: 3, label: "5-6", text: "Similarities and differences are <span class='kw'>discussed in detail</span>. Terminology used effectively throughout." }
                ]
            }
        ]
    },
    "p2aq4": {
        id: "p2aq4",
        title: "P2-A-Q4: Design of research method",
        ref: "Guide Page 54",
        type: "average",
        maxMark: 6,
        strands: [
            {
                name: "Procedural Design",
                options: [
                    { val: 1, label: "1-2", text: "The procedure of the research method is <span class='kw'>described in limited detail</span> or contains inaccuracies." },
                    { val: 2, label: "3-4", text: "The procedure is explained in <span class='kw'>some detail but lacks clarity</span>. Terminology used with some inaccuracies." },
                    { val: 3, label: "5-6", text: "The procedure of the research method is <span class='kw'>explained with accuracy and detail</span>. Terminology used effectively." }
                ]
            }
        ]
    },
    "p2b": {
        id: "p2b",
        title: "P2-B: Evaluation of an unseen research study",
        ref: "Guide Page 54-55",
        type: "best-fit-15",
        maxMark: 15,
        strands: [
            {
                name: "Concept Understanding",
                options: [
                    { val: 1, label: "1-3", text: "Response indicates <span class='kw'>little understanding</span> of specified concepts in relation to the study. Knowledge very limited." },
                    { val: 2, label: "4-6", text: "Response indicates <span class='kw'>basic understanding</span> of at least one specified concept. Knowledge is <span class='kw'>described</span>." },
                    { val: 3, label: "7-9", text: "Response indicates <span class='kw'>some understanding</span> of one or more specified concepts. Knowledge is <span class='kw'>partly explained</span>." },
                    { val: 4, label: "10-12", text: "Response indicates <span class='kw'>good understanding</span> of at least two specified concepts. Knowledge is <span class='kw'>mostly explained</span>." },
                    { val: 5, label: "13-15", text: "Response indicates <span class='kw'>very good understanding</span> of two or more specified concepts. Knowledge is <span class='kw'>fully explained</span>." }
                ]
            },
            {
                name: "Critical Analysis of Study",
                options: [
                    { val: 1, label: "1-3", text: "Response is <span class='kw'>descriptive</span>. Any analysis is superficial or incoherent. Links to source are irrelevant." },
                    { val: 2, label: "4-6", text: "Limited analysis present. Links to source material are of <span class='kw'>limited relevance</span>. Simplistic conclusion." },
                    { val: 3, label: "7-9", text: "Response contains analysis, although this <span class='kw'>lacks development</span>. Conclusion is inconsistent." },
                    { val: 4, label: "10-12", text: "Contains critical analysis, although this <span class='kw'>lacks development</span>. Conclusion is <span class='kw'>consistent</span>." },
                    { val: 5, label: "13-15", text: "Response contains <span class='kw'>well-developed critical analysis</span>. Effective and specific references to study." }
                ]
            },
            {
                name: "Terminology & Synthesis",
                options: [
                    { val: 1, label: "1-3", text: "Terminology is <span class='kw'>not used</span> or points are inaccurate. Conclusion missing." },
                    { val: 2, label: "4-6", text: "Terminology used with <span class='kw'>inaccuracies</span>. A <span class='kw'>simplistic conclusion</span> is included." },
                    { val: 3, label: "7-9", text: "Terminology used <span class='kw'>sometimes appropriately</span>. Relevant points made but lack accuracy." },
                    { val: 4, label: "10-12", text: "Terminology used <span class='kw'>mostly appropriately</span>. Relevant points are made." },
                    { val: 5, label: "13-15", text: "<span class='kw'>Accurate and precise</span> use of terminology. Response argues to a <span class='kw'>reasoned conclusion</span>." }
                ]
            }
        ]
    },

    // --- PAPER 3: HL EXTENSION ---
    "p3q1": {
        id: "p3q1",
        title: "P3-Q1: Interpretation of graphs",
        ref: "Guide Page 56",
        type: "average",
        maxMark: 3,
        strands: [
            {
                name: "Limitation Explanation",
                options: [
                    { val: 1, label: "1", text: "A relevant issue that limits interpretation is <span class='kw'>identified</span>." },
                    { val: 2, label: "2", text: "A relevant issue that limits interpretation is <span class='kw'>clearly described</span>." },
                    { val: 3, label: "3", text: "A relevant issue that limits interpretation is <span class='kw'>explained</span>." }
                ]
            }
        ]
    },
    "p3q2": {
        id: "p3q2",
        title: "P3-Q2: Data analysis (Conclusion)",
        ref: "Guide Page 56",
        type: "average",
        maxMark: 6,
        strands: [
            {
                name: "Analysis Quality",
                options: [
                    { val: 1, label: "1-2", text: "There is <span class='kw'>limited analysis</span> of data. A conclusion is attempted but is <span class='kw'>not relevant</span>." },
                    { val: 2, label: "3-4", text: "Analysis of the data is accurate but <span class='kw'>lacks detail</span> or development. Link lacks clarity." },
                    { val: 3, label: "5-6", text: "The data is <span class='kw'>analysed in detail</span>. A conclusion is stated that is <span class='kw'>explicitly linked</span> to the findings." }
                ]
            }
        ]
    },
    "p3q3": {
        id: "p3q3",
        title: "P3-Q3: Research considerations",
        ref: "Guide Page 56-57",
        type: "average",
        maxMark: 6,
        strands: [
            {
                name: "Methodological Understanding",
                options: [
                    { val: 1, label: "1-2", text: "Discussion shows <span class='kw'>limited understanding</span>. Evidence from source is limited or missing." },
                    { val: 2, label: "3-4", text: "Discussion shows <span class='kw'>some understanding</span>. Reference to relevant supporting evidence is <span class='kw'>implicit</span>." },
                    { val: 3, label: "5-6", text: "Discussion shows <span class='kw'>detailed understanding</span>. Reference to relevant evidence is <span class='kw'>explicit</span>." }
                ]
            }
        ]
    },
    "p3q4": {
        id: "p3q4",
        title: "P3-Q4: Synthesis of HL Extension",
        ref: "Guide Page 57-58",
        type: "best-fit-15",
        maxMark: 15,
        strands: [
            {
                name: "Integration of Sources",
                options: [
                    { val: 1, label: "1-3", text: "Knowledge is <span class='kw'>anecdotal</span> or marginal. There is <span class='kw'>no clear link</span> to the claim." },
                    { val: 2, label: "4-6", text: "Interprets one or more sources but <span class='kw'>with inaccuracies</span>. Knowledge described." },
                    { val: 3, label: "7-9", text: "Interprets at least two sources. Discussion of validity is <span class='kw'>limited</span> or lacks clarity." },
                    { val: 4, label: "10-12", text: "Interprets two or more sources to <span class='kw'>effectively support</span> the discussion of the claim." },
                    { val: 5, label: "13-15", text: "Interprets at least three sources <span class='kw'>effectively</span>. Detailed relevant discussion of validity." }
                ]
            },
            {
                name: "Critical Analysis of Claim",
                options: [
                    { val: 1, label: "1-3", text: "Response is <span class='kw'>mostly descriptive</span>. Any analysis is superficial or incoherent." },
                    { val: 2, label: "4-6", text: "Contains <span class='kw'>limited analysis</span>. Discussion of the claim is descriptive." },
                    { val: 3, label: "7-9", text: "Response contains analysis, although this <span class='kw'>lacks development</span>. Claim partially explained." },
                    { val: 4, label: "10-12", text: "Contains critical analysis. Relevant knowledge used to <span class='kw'>support the discussion</span>." },
                    { val: 5, label: "13-15", text: "Contains <span class='kw'>well-developed critical analysis</span>. Detailed relevant knowledge used throughout." }
                ]
            },
            {
                name: "Evaluation of Perspectives",
                options: [
                    { val: 1, label: "1-3", text: "<span class='kw'>Little or no discussion</span> of different points of view. Conclusion not consistent." },
                    { val: 2, label: "4-6", text: "Little relevant discussion of POV. A <span class='kw'>simplistic conclusion</span> is included." },
                    { val: 3, label: "7-9", text: "Different points of view <span class='kw'>identified</span>. Conclusion is only partially supported." },
                    { val: 4, label: "10-12", text: "Different points of view <span class='kw'>identified</span>. The response argues to a consistent conclusion." },
                    { val: 5, label: "13-15", text: "Different points of view are <span class='kw'>identified and evaluated</span>. Reasoned and clearly stated conclusion." }
                ]
            }
        ]
    },

    // --- INTERNAL ASSESSMENT ---
    "ia": {
        id: "ia",
        title: "Psychology research proposal (IA)",
        ref: "Guide Page 64-65",
        type: "summative",
        maxMark: 24,
        strands: [
            {
                name: "Criterion A: Introduction",
                options: [
                    { val: 2, label: "1-2", text: "Aim or research question stated but <span class='kw'>too broad</span>. Problem stated. 1-2 studies not made relevant." },
                    { val: 4, label: "3-4", text: "Aim or research question is <span class='kw'>clearly stated but only partially focused</span>. 2 studies linked." },
                    { val: 6, label: "5-6", text: "Aim or research question is <span class='kw'>clearly stated and focused</span>. Impact on population <span class='kw'>explained</span>. 2 studies fully relevant." }
                ]
            },
            {
                name: "Criterion B: Methodology",
                options: [
                    { val: 2, label: "1-2", text: "Research method described with <span class='kw'>errors in understanding</span>. Procedure is unclear. Ethics not linked." },
                    { val: 4, label: "3-4", text: "Choice of research method <span class='kw'>described but lacks detail</span>. Ethical considerations are described." },
                    { val: 6, label: "5-6", text: "Choice of research method <span class='kw'>explained</span>. Procedure fully explained. Ethics explicitly linked." }
                ]
            },
            {
                name: "Criterion C: Data collection",
                options: [
                    { val: 2, label: "1-2", text: "Appropriate tool created but <span class='kw'>contains errors</span>. Decisions have limited relevance. Challenges not relevant." },
                    { val: 4, label: "3-4", text: "Appropriate tool created. Creation decisions <span class='kw'>described and relevant</span>. Potential challenges described." },
                    { val: 6, label: "5-6", text: "Effective tool created. Decisions <span class='kw'>explained and relevant</span>. Potential challenges <span class='kw'>fully explained</span>." }
                ]
            },
            {
                name: "Criterion D: Discussion",
                options: [
                    { val: 2, label: "1-2", text: "Potential findings described but <span class='kw'>implications not addressed</span>. Bias identified. Additional method described without context." },
                    { val: 4, label: "3-4", text: "Findings described and <span class='kw'>implications partially addressed</span>. Bias described. Usefulness of one method discussed." },
                    { val: 6, label: "5-6", text: "Findings described in detail and <span class='kw'>implications fully explained</span>. Bias <span class='kw'>discussed</span>. Usefulness of additional method discussed with context." }
                ]
            }
        ]
    }
};