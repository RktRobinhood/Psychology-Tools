/**
 * IB Psychology 2027 Verbatim Rubric Data Store
 * Fully populated with 2027 Guide qualitative descriptors (Pages 51-65).
 * 
 * Logic Note: 'mid' represents the mean mark of the achievement band 
 * used for robust Best-Fit calculations.
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
                    { val: 1, mid: 1.5, label: "1-2", text: "The response demonstrates <span class='kw'>limited knowledge</span> relevant to the question." },
                    { val: 2, mid: 3.5, label: "3-4", text: "The response demonstrates <span class='kw'>detailed knowledge</span> relevant to the question." }
                ]
            },
            {
                name: "Application of example",
                options: [
                    { val: 1, mid: 1.5, label: "1-2", text: "The example is relevant but is <span class='kw'>not explained</span>." },
                    { val: 2, mid: 3.5, label: "3-4", text: "The example is relevant and <span class='kw'>explained</span>." }
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
                    { val: 1, mid: 1.5, label: "1-2", text: "Knowledge and understanding of the question are <span class='kw'>limited</span>." },
                    { val: 2, mid: 3.5, label: "3-4", text: "Knowledge and understanding have <span class='kw'>some detail</span> and are mostly accurate." },
                    { val: 3, mid: 5.5, label: "5-6", text: "Knowledge and understanding are <span class='kw'>accurate and detailed</span>." }
                ]
            },
            {
                name: "Application of knowledge",
                options: [
                    { val: 1, mid: 1.5, label: "1-2", text: "The application of knowledge is relevant but <span class='kw'>limited</span>." },
                    { val: 2, mid: 3.5, label: "3-4", text: "The application of knowledge is relevant and <span class='kw'>partially developed</span>." },
                    { val: 3, mid: 5.5, label: "5-6", text: "The application of relevant knowledge is <span class='kw'>well developed</span>." }
                ]
            }
        ]
    },
    "p1c": {
        id: "p1c",
        title: "P1-C: Concept-based extended response questions (ERQs)",
        ref: "Guide Page 52-53",
        type: "best-fit-15",
        maxMark: 15,
        strands: [
            {
                name: "Understanding Demands & Knowledge",
                options: [
                    { val: 1, mid: 2, label: "1-3", text: "The response indicates <span class='kw'>little understanding</span> of the demands of the question. Knowledge and understanding... are <span class='kw'>very limited</span> and contain inaccuracies." },
                    { val: 2, mid: 5, label: "4-6", text: "The response indicates <span class='kw'>some understanding</span> of the demands of the question. Relevant knowledge and understanding are <span class='kw'>described</span>." },
                    { val: 3, mid: 8, label: "7-9", text: "Understanding of the demands are <span class='kw'>partially addressed</span>. Relevant knowledge and understanding are <span class='kw'>partly explained</span>." },
                    { val: 4, mid: 11, label: "10-12", text: "The demands of the question are <span class='kw'>addressed</span>. Relevant knowledge and understanding are <span class='kw'>mostly explained</span>." },
                    { val: 5, mid: 14, label: "13-15", text: "The demands of the question are <span class='kw'>fully explained</span>. Relevant knowledge and understanding are <span class='kw'>fully explained</span>." }
                ]
            },
            {
                name: "Critical Analysis & Synthesis",
                options: [
                    { val: 1, mid: 2, label: "1-3", text: "Any analysis present is <span class='kw'>superficial or incoherent</span>. Links are not stated or not relevant." },
                    { val: 2, mid: 5, label: "4-6", text: "There is <span class='kw'>limited analysis</span> present and overall the response is <span class='kw'>more descriptive</span> than it is analytical. Links between area of study and concept are stated." },
                    { val: 3, mid: 8, label: "7-9", text: "The response contains analysis, although this <span class='kw'>lacks development</span>. Links are <span class='kw'>partly relevant</span>." },
                    { val: 4, mid: 11, label: "10-12", text: "The response contains critical analysis, although this <span class='kw'>lacks development</span>. Links are included and <span class='kw'>explained</span>. Reasoning arguments are presented." },
                    { val: 5, mid: 14, label: "13-15", text: "The response contains <span class='kw'>well-developed critical analysis</span>. Links between area of study and concept are <span class='kw'>fully explained</span> throughout." }
                ]
            },
            {
                name: "Terminology & Conclusion",
                options: [
                    { val: 1, mid: 2, label: "1-3", text: "Psychological terminology is <span class='kw'>not used</span> or is consistently used inappropriately. Conclusion is <span class='kw'>missing or not consistent</span>." },
                    { val: 2, mid: 5, label: "4-6", text: "Terminology is used, but <span class='kw'>often inappropriately</span>. Points are frequently imprecise. A <span class='kw'>simplistic conclusion</span> is included." },
                    { val: 3, mid: 8, label: "7-9", text: "Terminology used <span class='kw'>sometimes appropriately</span>. Relevant points are made. Conclusion is included but is not always <span class='kw'>consistent</span>." },
                    { val: 4, mid: 11, label: "10-12", text: "Terminology used <span class='kw'>mostly appropriately</span>. Relevant points are made and are accurate. Conclusion is <span class='kw'>consistent</span> with the argument." },
                    { val: 5, mid: 14, label: "13-15", text: "There is <span class='kw'>accurate and precise</span> use of terminology. The response argues to a <span class='kw'>reasoned and clearly stated conclusion</span>." }
                ]
            }
        ]
    },

    // --- PAPER 2 SECTIONS ---
    "p2aq1": {
        id: "p2aq1",
        title: "P2-A-Q1: Class practicals (Knowledge)",
        ref: "Guide Page 53",
        type: "average",
        maxMark: 4,
        strands: [
            {
                name: "Methodological Knowledge",
                options: [
                    { val: 1, mid: 1.5, label: "1-2", text: "The response demonstrates <span class='kw'>limited knowledge</span> of the research methodology relevant to the class practical. Terminology is limited or contains inaccuracies." },
                    { val: 2, mid: 3.5, label: "3-4", text: "The response demonstrates <span class='kw'>detailed knowledge</span> and understanding of the research methodology relevant to the class practical. Terminology is <span class='kw'>used accurately</span>." }
                ]
            }
        ]
    },
    "p2aq2": {
        id: "p2aq2",
        title: "P2-A-Q2: Class practicals (Application)",
        ref: "Guide Page 53",
        type: "average",
        maxMark: 4,
        strands: [
            {
                name: "Conceptual Application",
                options: [
                    { val: 1, mid: 1.5, label: "1-2", text: "The knowledge and understanding of the concept are <span class='kw'>relevant but limited</span>. There are <span class='kw'>some relevant links</span>." },
                    { val: 2, mid: 3.5, label: "3-4", text: "The knowledge and understanding of the concept are <span class='kw'>well developed</span>. There are <span class='kw'>clear and detailed links</span> between concept and practical." }
                ]
            }
        ]
    },
    "p2aq3": {
        id: "p2aq3",
        title: "P2-A-Q3: Class practicals (Compare and contrast)",
        ref: "Guide Page 53-54",
        type: "average",
        maxMark: 6,
        strands: [
            {
                name: "Comparison Logic",
                options: [
                    { val: 1, mid: 1.5, label: "1-2", text: "Similarities or differences are <span class='kw'>described in limited detail</span> or contain errors. Limited terminology relevant to research methods." },
                    { val: 2, mid: 3.5, label: "3-4", text: "Similarities and differences are <span class='kw'>explained in limited detail</span> and may lack clarity OR either is <span class='kw'>discussed in detail</span>." },
                    { val: 3, mid: 5.5, label: "5-6", text: "Similarities and differences are <span class='kw'>discussed in detail</span>. Psychological terminology relevant to research methods is <span class='kw'>used effectively</span>." }
                ]
            }
        ]
    },
    "p2aq4": {
        id: "p2aq4",
        title: "P2-A-Q4: Class practicals (Design)",
        ref: "Guide Page 54",
        type: "average",
        maxMark: 6,
        strands: [
            {
                name: "Procedural Design",
                options: [
                    { val: 1, mid: 1.5, label: "1-2", text: "The procedure of the research method is <span class='kw'>described in limited detail</span> or contains inaccuracies. Limited use of terminology." },
                    { val: 2, mid: 3.5, label: "3-4", text: "The procedure of the research method is <span class='kw'>explained in some detail</span> but lacks clarity. Terminology used with some inaccuracies." },
                    { val: 3, mid: 5.5, label: "5-6", text: "The procedure of the research method is <span class='kw'>explained with accuracy and detail</span>. Terminology relevant to the method is <span class='kw'>used effectively</span>." }
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
                    { val: 1, mid: 2, label: "1-3", text: "The response indicates <span class='kw'>little understanding</span> of specified concepts in relation to the study. Knowledge very limited." },
                    { val: 2, mid: 5, label: "4-6", text: "The response indicates a <span class='kw'>basic understanding</span> of at least one of the specified concepts in relation to the study." },
                    { val: 3, mid: 8, label: "7-9", text: "The response indicates <span class='kw'>some understanding</span> of one or more specified concepts. Knowledge is <span class='kw'>partly explained</span>." },
                    { val: 4, mid: 11, label: "10-12", text: "The response indicates <span class='kw'>good understanding</span> of at least two of the specified concepts. Knowledge is <span class='kw'>mostly explained</span>." },
                    { val: 5, mid: 14, label: "13-15", text: "The response indicates <span class='kw'>very good understanding</span> of two or more specified concepts. Knowledge is <span class='kw'>fully explained</span>." }
                ]
            },
            {
                name: "Critical Analysis of Study",
                options: [
                    { val: 1, mid: 2, label: "1-3", text: "Response is <span class='kw'>descriptive</span>. Any analysis is superficial or incoherent. Links to study are irrelevant." },
                    { val: 2, mid: 5, label: "4-6", text: "Limited analysis present. Links to source study are of <span class='kw'>limited relevance</span>. Simplistic conclusion." },
                    { val: 3, mid: 8, label: "7-9", text: "Response contains analysis, although this <span class='kw'>lacks development</span>. Conclusion is inconsistent." },
                    { val: 4, mid: 11, label: "10-12", text: "Contains critical analysis, although this <span class='kw'>lacks development</span>. Conclusion is <span class='kw'>consistent</span>." },
                    { val: 5, mid: 14, label: "13-15", text: "Response contains <span class='kw'>well-developed critical analysis</span>. Effective and specific references to study." }
                ]
            },
            {
                name: "Terminology & Synthesis",
                options: [
                    { val: 1, mid: 2, label: "1-3", text: "Psychological terminology is <span class='kw'>not used</span> or points are inaccurate. Conclusion missing." },
                    { val: 2, mid: 5, label: "4-6", text: "Terminology used with inaccuracies. A <span class='kw'>simplistic conclusion</span> is included." },
                    { val: 3, mid: 8, label: "7-9", text: "Terminology used <span class='kw'>sometimes appropriately</span>. Relevant points made but lack accuracy." },
                    { val: 4, mid: 11, label: "10-12", text: "Terminology used <span class='kw'>mostly appropriately</span>. Relevant points are made." },
                    { val: 5, mid: 14, label: "13-15", text: "<span class='kw'>Accurate and precise</span> use of terminology. Response argues to a <span class='kw'>reasoned conclusion</span>." }
                ]
            }
        ]
    },

    // --- PAPER 3 SECTIONS ---
    "p3q1": {
        id: "p3q1",
        title: "P3-Q1: Interpretation of graphs",
        ref: "Guide Page 56",
        type: "average",
        maxMark: 3,
        strands: [
            {
                name: "Explanation of Limitation",
                options: [
                    { val: 1, mid: 1, label: "1", text: "A relevant issue that limits interpretation is <span class='kw'>identified</span>." },
                    { val: 2, mid: 2, label: "2", text: "A relevant issue that limits interpretation is <span class='kw'>clearly described</span>." },
                    { val: 3, mid: 3, label: "3", text: "A relevant issue that limits interpretation is <span class='kw'>explained</span>." }
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
                name: "Logic and Inference",
                options: [
                    { val: 1, mid: 1.5, label: "1-2", text: "There is <span class='kw'>limited analysis</span> of data. A conclusion is attempted but is <span class='kw'>not relevant</span>." },
                    { val: 2, mid: 3.5, label: "3-4", text: "Analysis of the data is accurate but <span class='kw'>lacks detail</span>. Link to findings lacks clarity." },
                    { val: 3, mid: 5.5, label: "5-6", text: "The data is <span class='kw'>analysed in detail</span>. A conclusion is stated that is <span class='kw'>explicitly linked</span> to the findings." }
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
                name: "Methodological Discussion",
                options: [
                    { val: 1, mid: 1.5, label: "1-2", text: "Discussion shows <span class='kw'>limited understanding</span>. Evidence from source is limited or missing." },
                    { val: 2, mid: 3.5, label: "3-4", text: "Discussion shows <span class='kw'>some understanding</span>. Reference to relevant supporting evidence is <span class='kw'>implicit</span>." },
                    { val: 3, mid: 5.5, label: "5-6", text: "Discussion shows <span class='kw'>detailed understanding</span>. Reference to relevant evidence is <span class='kw'>explicit</span>." }
                ]
            }
        ]
    },
    "p3q4": {
        id: "p3q4",
        title: "P3-Q4: Synthesis",
        ref: "Guide Page 57-58",
        type: "best-fit-15",
        maxMark: 15,
        strands: [
            {
                name: "Integration of Sources",
                options: [
                    { val: 1, mid: 2, label: "1-3", text: "Knowledge is <span class='kw'>anecdotal</span> or of very marginal relevance. There is <span class='kw'>no clear link</span> to the claim." },
                    { val: 2, mid: 5, label: "4-6", text: "Interprets one or more sources but <span class='kw'>with inaccuracies</span>. Knowledge described." },
                    { val: 3, mid: 8, label: "7-9", text: "Interprets at least two sources. Discussion of validity is <span class='kw'>limited or lacks clarity</span>." },
                    { val: 4, mid: 11, label: "10-12", text: "Interprets two or more sources to <span class='kw'>effectively support</span> the discussion of the claim." },
                    { val: 5, mid: 14, label: "13-15", text: "Interprets at least three sources <span class='kw'>effectively</span> to support discussion. Knowledge is detailed." }
                ]
            },
            {
                name: "Critical Analysis of Claim",
                options: [
                    { val: 1, mid: 2, label: "1-3", text: "Response is <span class='kw'>mostly descriptive</span>. Any analysis is superficial or incoherent." },
                    { val: 2, mid: 5, label: "4-6", text: "Contains <span class='kw'>limited analysis</span>. Discussion of the extent to which the claim is valid is limited." },
                    { val: 3, mid: 8, label: "7-9", text: "Response contains analysis, although this <span class='kw'>lacks development</span>. Conclusion partially supported." },
                    { val: 4, mid: 11, label: "10-12", text: "Contains critical analysis. Discussion of the <span class='kw'>extent to which the claim is valid</span>." },
                    { val: 5, mid: 14, label: "13-15", text: "Contains <span class='kw'>well-developed critical analysis</span>. Relevant knowledge is used effectively." }
                ]
            },
            {
                name: "Evaluation of Perspectives",
                options: [
                    { val: 1, mid: 2, label: "1-3", text: "<span class='kw'>Little or no discussion</span> of different points of view. Conclusion not consistent." },
                    { val: 2, mid: 5, label: "4-6", text: "Little relevant discussion of POV. A <span class='kw'>simplistic conclusion</span> is included." },
                    { val: 3, mid: 8, label: "7-9", text: "Different points of view <span class='kw'>identified</span>. Conclusion is only partially supported." },
                    { val: 4, mid: 11, label: "10-12", text: "Different points of view are <span class='kw'>identified</span>. The response argues to a consistent conclusion." },
                    { val: 5, mid: 14, label: "13-15", text: "Different points of view are <span class='kw'>identified and evaluated</span>. Response argues to a <span class='kw'>reasoned conclusion</span>." }
                ]
            }
        ]
    },

    // --- INTERNAL ASSESSMENT ---
    "ia": {
        id: "ia",
        title: "IA: Psychology research proposal",
        ref: "Guide Page 64-65",
        type: "summative",
        maxMark: 24,
        strands: [
            {
                name: "Criterion A: Introduction",
                options: [
                    { val: 2, mid: 1.5, label: "1-2", text: "Aim stated but <span class='kw'>too broad</span>. Problem stated. 1-2 studies not relevant." },
                    { val: 4, mid: 3.5, label: "3-4", text: "Aim <span class='kw'>clearly stated but partially focused</span>. Problem described. 2 studies linked." },
                    { val: 6, mid: 5.5, label: "5-6", text: "Aim <span class='kw'>clearly stated and focused</span>. Impact explained. Studies fully relevant." }
                ]
            },
            {
                name: "Criterion B: Methodology",
                options: [
                    { val: 2, mid: 1.5, label: "1-2", text: "Research method described with <span class='kw'>errors in understanding</span>. Procedure is unclear." },
                    { val: 4, mid: 3.5, label: "3-4", text: "Choice of research method <span class='kw'>described but lacks detail</span>. Ethics described." },
                    { val: 6, mid: 5.5, label: "5-6", text: "Choice of research method <span class='kw'>explained</span>. Procedure fully explained. Ethics explicitly linked." }
                ]
            },
            {
                name: "Criterion C: Data collection",
                options: [
                    { val: 2, mid: 1.5, label: "1-2", text: "An appropriate tool created but <span class='kw'>contains errors</span>. Challenges not relevant." },
                    { val: 4, mid: 3.5, label: "3-4", text: "Appropriate tool created. Decisions <span class='kw'>described and relevant</span>. Challenges described." },
                    { val: 6, mid: 5.5, label: "5-6", text: "Effective data collection tool created. Decisions <span class='kw'>explained and relevant</span>. Challenges fully explained." }
                ]
            },
            {
                name: "Criterion D: Discussion",
                options: [
                    { val: 2, mid: 1.5, label: "1-2", text: "Potential findings described but <span class='kw'>implications not addressed</span>. Bias identified." },
                    { val: 4, mid: 3.5, label: "3-4", text: "Findings described and <span class='kw'>implications partially addressed</span>. Bias described." },
                    { val: 6, mid: 5.5, label: "5-6", text: "Findings described in detail and <span class='kw'>implications fully explained</span>. Bias <span class='kw'>discussed</span>." }
                ]
            }
        ]
    }
};