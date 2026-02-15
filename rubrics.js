/**
 * IB Psychology 2027 Verbatim Rubric Data Store
 * Sourced from First Assessment 2027 Guide (Pages 51-65)
 * Keywords for 'Step-Up' linguistic logic are highlighted via <span class="kw">
 */

const PSYCH_RUBRICS = {
    // --- PAPER 1 SECTIONS ---
    "p1a": {
        id: "p1a",
        title: "P1-A: Short-answer questions (SAQs)",
        ref: "Guide Page 51",
        type: "average",
        maxMark: 4,
        levels: 2,
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
        levels: 3,
        strands: [
            {
                name: "Knowledge and understanding",
                options: [
                    { val: 1, label: "1-2", text: "Knowledge and understanding of the question are <span class='kw'>limited</span>." },
                    { val: 2, label: "3-4", text: "Knowledge and understanding have some detail and are <span class='kw'>mostly accurate</span>." },
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
        title: "P1-C: Concept-based extended response questions (ERQs)",
        ref: "Guide Page 52-53",
        type: "best-fit-15",
        maxMark: 15,
        levels: 5,
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
                    { val: 2, label: "4-6", text: "There is <span class='kw'>limited analysis</span> present and overall the response is <span class='kw'>more descriptive</span> than it is analytical. Links between area of study and concept are stated." },
                    { val: 3, label: "7-9", text: "The response contains analysis, although this <span class='kw'>lacks development</span>. Links are <span class='kw'>partly relevant</span>." },
                    { val: 4, label: "10-12", text: "The response contains critical analysis, although this <span class='kw'>lacks development</span>. Links are included and <span class='kw'>explained</span>. Arguments are presented." },
                    { val: 5, label: "13-15", text: "The response contains <span class='kw'>well-developed critical analysis</span>. Links between area of study and concept are <span class='kw'>fully explained</span> throughout." }
                ]
            },
            {
                name: "Terminology & Conclusion",
                options: [
                    { val: 1, label: "1-3", text: "Psychological terminology is <span class='kw'>not used</span> or is consistently used inappropriately. Conclusion is <span class='kw'>missing or not consistent</span>." },
                    { val: 2, label: "4-6", text: "Terminology is used, but often <span class='kw'>inappropriately</span>. A <span class='kw'>simplistic conclusion</span> is included." },
                    { val: 3, label: "7-9", text: "Terminology used <span class='kw'>sometimes appropriately</span>. Relevant points are made. Conclusion is included but is not always <span class='kw'>consistent</span>." },
                    { val: 4, label: "10-12", text: "Terminology used <span class='kw'>mostly appropriately</span>. Relevant points are made and are accurate. Conclusion is <span class='kw'>consistent with the argument</span>." },
                    { val: 5, label: "13-15", text: "There is <span class='kw'>accurate and precise</span> use of terminology. The response argues to a <span class='kw'>reasoned and clearly stated conclusion</span>." }
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
        levels: 2,
        strands: [
            {
                name: "Knowledge of methodology",
                options: [
                    { val: 1, label: "1-2", text: "The response demonstrates <span class='kw'>limited knowledge</span> of the research methodology relevant to the class practical. Psychological terminology is limited or contains inaccuracies." },
                    { val: 2, label: "3-4", text: "The response demonstrates <span class='kw'>detailed knowledge</span> and understanding of the research methodology relevant to the class practical. Psychological terminology is <span class='kw'>used accurately</span>." }
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
        levels: 2,
        strands: [
            {
                name: "Application to practical",
                options: [
                    { val: 1, label: "1-2", text: "The knowledge and understanding of the concept are <span class='kw'>relevant but limited</span>. There are <span class='kw'>some relevant links</span> between the concept and the class practical." },
                    { val: 2, label: "3-4", text: "The knowledge and understanding of the concept are <span class='kw'>well developed</span>. There are <span class='kw'>clear and detailed links</span> between the concept and the class practical." }
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
        levels: 3,
        strands: [
            {
                name: "Similarities & Differences",
                options: [
                    { val: 1, label: "1-2", text: "Similarities or differences are <span class='kw'>described in limited detail</span> or contain errors. Limited terminology relevant to research methods." },
                    { val: 2, label: "3-4", text: "Similarities and differences are <span class='kw'>explained in limited detail</span> and may lack clarity OR either is <span class='kw'>discussed in detail</span>." },
                    { val: 3, label: "5-6", text: "Similarities and differences are <span class='kw'>discussed in detail</span>. Psychological terminology relevant to research methods is <span class='kw'>used effectively</span>." }
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
        levels: 3,
        strands: [
            {
                name: "Methodological Design",
                options: [
                    { val: 1, label: "1-2", text: "The procedure of the research method is <span class='kw'>described in limited detail</span> or contains inaccuracies. Limited use of terminology." },
                    { val: 2, label: "3-4", text: "The procedure of the research method is <span class='kw'>explained in some detail</span> but lacks clarity. Terminology used with some inaccuracies." },
                    { val: 3, label: "5-6", text: "The procedure of the research method is <span class='kw'>explained with accuracy and detail</span>. Terminology relevant to the method is <span class='kw'>used effectively</span>." }
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
        levels: 5,
        strands: [
            {
                name: "Concept Understanding",
                options: [
                    { val: 1, label: "1-3", text: "The response indicates <span class='kw'>little understanding</span> of, and critical engagement with, any of the specified concepts in relation to the study. Knowledge very limited." },
                    { val: 2, label: "4-6", text: "The response indicates a <span class='kw'>basic understanding</span> of, and critical engagement with, at least one of the specified concepts in relation to the study." },
                    { val: 3, label: "7-9", text: "The response indicates <span class='kw'>some understanding</span> of, and critical engagement with, one or more of the specified concepts in relation to the study." },
                    { val: 4, label: "10-12", text: "The response indicates <span class='kw'>good understanding</span> of, and critical engagement with, at least two of the specified concepts in relation to the study." },
                    { val: 5, label: "13-15", text: "The response indicates <span class='kw'>very good understanding</span> of, and critical engagement with, two or more of the specified concepts in relation to the study." }
                ]
            },
            {
                name: "Analysis of Study & Links",
                options: [
                    { val: 1, label: "1-3", text: "Response is <span class='kw'>descriptive</span>. Any analysis is superficial or incoherent. Links to concepts and source material are <span class='kw'>irrelevant</span>." },
                    { val: 2, label: "4-6", text: "There is <span class='kw'>limited analysis</span> present and overall more descriptive than analytical. Links to source study are of <span class='kw'>limited relevance</span>." },
                    { val: 3, label: "7-9", text: "Response contains analysis, although this <span class='kw'>lacks development</span>. Links are explained, and they are <span class='kw'>partly relevant</span>." },
                    { val: 4, label: "10-12", text: "The response contains critical analysis, although this <span class='kw'>lacks development</span>. Links are used to support the discussion. Conclusion <span class='kw'>consistent</span>." },
                    { val: 5, label: "13-15", text: "Response contains <span class='kw'>well-developed critical analysis</span>. Links between concepts and source material are <span class='kw'>fully developed and effectively support</span> discussion." }
                ]
            },
            {
                name: "Terminology & Synthesis",
                options: [
                    { val: 1, label: "1-3", text: "Terminology is <span class='kw'>not used</span> or is consistently used inappropriately. Conclusion is <span class='kw'>missing or not consistent</span>." },
                    { val: 2, label: "4-6", text: "Terminology is used, but often <span class='kw'>inappropriately</span>. Points are frequently imprecise. A <span class='kw'>simplistic conclusion</span> is included." },
                    { val: 3, label: "7-9", text: "Terminology used <span class='kw'>sometimes appropriately</span>. Relevant points are made but <span class='kw'>lack accuracy and development</span>." },
                    { val: 4, label: "10-12", text: "Terminology used <span class='kw'>mostly appropriately</span>. Relevant points are made and are accurate but lack detail." },
                    { val: 5, label: "13-15", text: "There is <span class='kw'>accurate and precise</span> use of terminology. Response argues to a <span class='kw'>reasoned and clearly stated</span> conclusion." }
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
        levels: 3,
        strands: [
            {
                name: "Issue Identification",
                options: [
                    { val: 1, label: "1", text: "A relevant issue that limits the interpretation of the information is <span class='kw'>identified</span>." },
                    { val: 2, label: "2", text: "A relevant issue that limits the interpretation of the information is <span class='kw'>clearly described</span>." },
                    { val: 3, label: "3", text: "A relevant issue that limits the interpretation of the information is <span class='kw'>explained</span>." }
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
        levels: 3,
        strands: [
            {
                name: "Logic and Conclusion",
                options: [
                    { val: 1, label: "1-2", text: "There is <span class='kw'>limited analysis</span> of the data. A conclusion is attempted but is <span class='kw'>not relevant</span>." },
                    { val: 2, label: "3-4", text: "Analysis of the data is accurate but <span class='kw'>lacks detail or development</span>. A conclusion is stated but link lacks clarity." },
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
        levels: 3,
        strands: [
            {
                name: "Methodological Discussion",
                options: [
                    { val: 1, label: "1-2", text: "Discussion shows <span class='kw'>limited understanding</span>. Reference to supporting evidence from source is limited or missing." },
                    { val: 2, label: "3-4", text: "Discussion shows <span class='kw'>some understanding</span>. Reference to relevant supporting evidence from the source is <span class='kw'>implicit</span>." },
                    { val: 3, label: "5-6", text: "Discussion shows <span class='kw'>detailed understanding</span>. Reference to the relevant supporting evidence from the source is <span class='kw'>explicit</span>." }
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
        levels: 5,
        strands: [
            {
                name: "Integration & Interpretation",
                options: [
                    { val: 1, label: "1-3", text: "Knowledge is <span class='kw'>anecdotal</span> or of very marginal relevance. There is <span class='kw'>no clear link</span> to the claim." },
                    { val: 2, label: "4-6", text: "Relevant knowledge is used to interpret one or more of the sources but <span class='kw'>with inaccuracies</span>. Limited discussion." },
                    { val: 3, label: "7-9", text: "Interprets at least two sources. Discussion of validity is <span class='kw'>limited or lacks clarity</span>. Knowledge has some detail." },
                    { val: 4, label: "10-12", text: "Interprets two or more sources to effectively <span class='kw'>support the discussion</span> of the claim. Knowledge has detail." },
                    { val: 5, label: "13-15", text: "Interprets at least three sources <span class='kw'>effectively</span> to support discussion. Relevant knowledge is detailed and well developed." }
                ]
            },
            {
                name: "Analysis of Claim",
                options: [
                    { val: 1, label: "1-3", text: "Response is <span class='kw'>mostly descriptive</span>. Any analysis present is superficial or incoherent. Validity not addressed." },
                    { val: 2, label: "4-6", text: "Contains <span class='kw'>limited analysis</span>. Response is more descriptive than analytical. extent of validity is limited." },
                    { val: 3, label: "7-9", text: "Response contains analysis, although this <span class='kw'>lacks development</span>. Conclusion only partially supported." },
                    { val: 4, label: "10-12", text: "Contains critical analysis. Discussion of the <span class='kw'>extent to which the claim is valid</span>. Argument is consistent." },
                    { val: 5, label: "13-15", text: "Contains <span class='kw'>well-developed critical analysis</span>. Relevant knowledge is used effectively to support discussion." }
                ]
            },
            {
                name: "Evaluation of Perspectives",
                options: [
                    { val: 1, label: "1-3", text: "<span class='kw'>Little or no discussion</span> of different points of view. Conclusion missing or not consistent." },
                    { val: 2, label: "4-6", text: "There is little relevant discussion of different points of view. A <span class='kw'>simplistic conclusion</span> is included." },
                    { val: 3, label: "7-9", text: "Discussion on <span class='kw'>different points of view</span> is included. Conclusion is only partially supported by evidence." },
                    { val: 4, label: "10-12", text: "There is some discussion of <span class='kw'>different points of view</span>. Argument argues to a consistent conclusion." },
                    { val: 5, label: "13-15", text: "Different points of view are <span class='kw'>identified and evaluated</span>. Response argues to a <span class='kw'>reasoned conclusion</span>." }
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
        levels: 3,
        strands: [
            {
                name: "Criterion A: Introduction",
                options: [
                    { val: 2, label: "1-2", text: "Aim or research question is stated but <span class='kw'>not clearly expressed or is too broad</span>. Problem is stated. 1-2 studies not relevant." },
                    { val: 4, label: "3-4", text: "Aim or research question is <span class='kw'>clearly stated but only partially focused</span>. Problem described but impact not addressed. 2 studies linked." },
                    { val: 6, label: "5-6", text: "Aim or research question is <span class='kw'>clearly stated and focused</span>. Impact on population <span class='kw'>explained</span>. 2 studies fully relevant and explained." }
                ]
            },
            {
                name: "Criterion B: Methodology",
                options: [
                    { val: 2, label: "1-2", text: "Research method described with <span class='kw'>errors in understanding</span>. Procedure is unclear. Ethics described but not linked." },
                    { val: 4, label: "3-4", text: "Choice of research method <span class='kw'>described but lacks detail</span>. Ethical considerations for the investigation described." },
                    { val: 6, label: "5-6", text: "Choice of research method <span class='kw'>explained</span>. Procedure fully explained. Ethics explicitly linked with mitigation steps." }
                ]
            },
            {
                name: "Criterion C: Data collection",
                options: [
                    { val: 2, label: "1-2", text: "An appropriate data collection tool has been created but <span class='kw'>contains errors</span>. Creation decisions has limited relevance. Challenges not relevant." },
                    { val: 4, label: "3-4", text: "Appropriate tool created. Creation decisions <span class='kw'>described and relevant</span>. Potential challenges described." },
                    { val: 6, label: "5-6", text: "Effective data collection tool created. Decisions <span class='kw'>explained and relevant</span>. Potential challenges <span class='kw'>fully explained</span>." }
                ]
            },
            {
                name: "Criterion D: Discussion",
                options: [
                    { val: 2, label: "1-2", text: "Potential findings described but <span class='kw'>implications not addressed</span>. Bias identified. Usefulness of additional method described without context." },
                    { val: 4, label: "3-4", text: "Findings described and <span class='kw'>implications partially addressed</span>. Bias described. Usefulness of one additional method discussed." },
                    { val: 6, label: "5-6", text: "Findings described in detail and <span class='kw'>implications fully explained</span>. Bias <span class='kw'>discussed</span>. Usefulness of additional method discussed with context." }
                ]
            }
        ]
    }
};