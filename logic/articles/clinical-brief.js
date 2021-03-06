/*
Make Ability to Do Variations of Headlines 
- Known Variants: 
    - Clinical Context --> ''
    - Study Synopsis and Perspective --> Synopsis and Perspective
    - Study Highlights --> Recommendation Highlights
    - Clinical Implications --> ''
*/

const _ = require("lodash");
const utils = require("../utils");
const stringOps = utils.stringOps;
const articleUtils = require('./article-utils');
const {ProfArticle, TOCElement, BriefChecklist, ProfActivity} = require("../classes");
const prodticket = require('../prodticket');
const snippets = require('../snippets');
const activityClinicalBrief = require('./activity').activityClinicalBrief;


/* CLINICAL CONTEXT 
-------------------------------------- */
function getClinicalContext(ticket) {
    // Get XML string from prod ticket.
    var {textBlock, label} = utils.stringOps.getTextBlock(
        ticket, 
        "Clinical Context", 
        "Study Synopsis"
    );

    if (stringOps.isBlankOrWhiteSpace(textBlock) || stringOps.isEmptyString(textBlock)) {
        return new Error("Clinical Context not found in the prodticket");
    } else {
        textBlock = utils.wrapSubsectionContent(textBlock, utils.cleanHTML.paragraph);
        // build the actual section element
        return articleUtils.buildSection(textBlock, label);
    }
}


/* STUDY SYNOPSIS AND PERSPECTIVE  
-------------------------------------- */
function getSynopsisAndPerspective(ticket) {
    // Get XML string from prod ticket.
    var {textBlock, label} = utils.stringOps.getTextBlock(
        ticket, 
        "Study Synopsis and Perspective", 
        "Study Highlights"
    );
    if (stringOps.isBlankOrWhiteSpace(textBlock) || stringOps.isEmptyString(textBlock)) {
        return new Error("Synopsis and Perspective not found in the prodticket");
    } else {
        textBlock = utils.wrapSubsectionContent(textBlock, utils.cleanHTML.paragraph);
        // build the actual section element
        return articleUtils.buildSection(textBlock, label);
    }
}


/* STUDY HIGHLIGHTS 
-------------------------------------- */
function getStudyHighlights (ticket) {
    var {textBlock, label} = utils.stringOps.getTextBlock(
        ticket,
        "Study Highlights",
        "Clinical Implications"
    );
    if (stringOps.isBlankOrWhiteSpace(textBlock) || stringOps.isEmptyString(textBlock)) {
        return new Error("Study Highlights not found in the prodticket");
    } else {
        textBlock = utils.wrapSubsectionContent(textBlock, utils.cleanHTML.unorderedList, [true, true, [ 'ul', 'li', 'em', 'strong', 'sup', 'sub', 'tt', 'table', 'tr', 'td', 'th','tbody' ]]);
        // textBlock = utils.wrapSubsectionContent(textBlock, utils.cleanHTML.unorderedList);
        // return textBlock
        return articleUtils.buildSection(textBlock, label);
    }
}


/* CLINICAL IMPLICATIONS
-------------------------------------- */
function getClinicalImplications(ticket) {
    var endRegexArray = [
        /CME.*pre-assessment\/post-assessment questions/g,
        /CME Post Test Questions/g,
        /(&#9744;|&#9745;)?[ ]?[<]strong\>COVID Program Disclaimer/g,
        /<p>_+<\/p>/g
    ];
    let implications = ticket
    let implicationsIndex = utils.stringOps.regexIndexOf(ticket, /Clinical Implications/)
    if(implicationsIndex > -1) {
        implications = ticket.slice(implicationsIndex, ticket.length)
    }else{
        return new Error("Clinical Implications not found in the prodticket");
    }
    var endRegex = utils.stringOps.getNextRegex(implications, endRegexArray);
    if (endRegex != -1) {
        var {textBlock, label} = utils.stringOps.getTextBlock(
            implications,
            /Clinical Implications/g,
            endRegex.symbol
        );
    } else {
        var {textBlock, label} = utils.stringOps.getTextBlock(
            ticket,
            "Clinical Implications",
            "CME Post Test Questions"
        );
    }

    if (stringOps.isBlankOrWhiteSpace(textBlock) || stringOps.isEmptyString(textBlock)) {
        return new Error("Clinical Implications not found in the prodticket");
    } else {
        textBlock = utils.wrapSubsectionContent(textBlock, utils.cleanHTML.unorderedList);
        return articleUtils.buildSection(textBlock, label);
    }
}


/* CHECKLIST FUNCTION  
-------------------------------------- */
function checklistClinicalBrief(ticket, program) {
    var checklist = new BriefChecklist();

    // ABBREVIATIONS
    checklist.abbreviations.result = prodticket.getAbbreviations(ticket, program);

    // BACKMATTER FRONT PAGE      
    checklist.bkmtrFront.result = utils.wrapSubsectionContent(snippets.backmatter.backmatterFrontPage(program));
    
    // BYLINE
    checklist.byline.result = prodticket.getByline(ticket, program);
    
    // COLLECTION PAGE 
    if (program.hasCollectionPage) {
        checklist.collectionPageInfo.result = prodticket.getCollectionPage(ticket, program);
    }
    
    // CONTRIBUTOR PRE CONTENT (CONTENT ABOVE CONTRIBS)
    checklist.contrbtrPreContent.result = utils.wrapSubsectionContent(snippets.preContent.contrbtrPreContentMarkup(program));
    
    // COPYRIGHT HOLDER 
    checklist.cpyrtHolder.result = utils.wrapSubsectionContent(snippets.copyrightHolder.copyrightHolderMarkup(program));
    
    // GOAL STATEMENT
    checklist.goalStatement.result = prodticket.getGoalStatement(ticket, program);
    
    // LEARNING OBJECTIVES
    checklist.learningObjectives.result = prodticket.getLearningObjectives(ticket, program); 
    
    // REFERENCES
    checklist.references.result = prodticket.getReferences(ticket, program);
    
    // TEASER
    // <<<<<<<< PLACEHOLDER >>>>>>>>> 
    
    // TARGET AUDIENCE 
    checklist.targetAudience.result = prodticket.getTargetAudience(ticket, program);
    
    // TITLE 
    checklist.title.result = prodticket.getTitle(ticket, program);

    // CME REVIEWERS 
    checklist.cmeReviewers.result = prodticket.getCMEReviewers(ticket, program);

    // CLINICAL CONTEXT
    checklist.clinicalContext.result = getClinicalContext(ticket);

    // SYNOPSIS AND PERSPECTIVE 
    checklist.synopsisAndPerspective.result = getSynopsisAndPerspective(ticket);

    // STUDY HIGHLIGHTS 
    checklist.studyHighlights.result = getStudyHighlights(ticket);

    // CLINICAL IMPLICATIONS 
    checklist.clinicalImplications.result = getClinicalImplications(ticket);

    return checklist.print();
}


/* MASTER FUNCTIONS 
-------------------------------------- */
function buildClinicalBrief(rawTicket, program) {
    var clinicalContext, synopsisAndPerspective, studyHighlights, clinicalImplications, cmeTest, references, title, byline, targetAudience, learningObjectives, cmeReviewers, ipce;
    let ticket = stringOps.getTextBlock(rawTicket, 'Handoff Notes and Reminders', 'General Information')
    ticket = rawTicket.replace(ticket.textBlock, '')
    var checklistResult = checklistClinicalBrief(ticket, program);    

    // Clinical Brief Sections
    clinicalContext = (checklistResult.properties.clinicalContext ? checklistResult.properties.clinicalContext.result : "");
    synopsisAndPerspective = (checklistResult.properties.synopsisAndPerspective ? checklistResult.properties.synopsisAndPerspective.result : "");
    studyHighlights = (checklistResult.properties.studyHighlights ? checklistResult.properties.studyHighlights.result : "");
    clinicalImplications = (checklistResult.properties.clinicalImplications ? checklistResult.properties.clinicalImplications.result : "");

    // Universal Info (Markup Strings)
    references = (checklistResult.properties.references ? checklistResult.properties.references.result : "");
    title = (checklistResult.properties.title ? checklistResult.properties.title.result : "");
    byline = (checklistResult.properties.byline ? checklistResult.properties.byline.result : "");

    // Build Activity  
    targetAudience = (checklistResult.properties.targetAudience ? checklistResult.properties.targetAudience.result : "");

    learningObjectives = (checklistResult.properties.learningObjectives ? checklistResult.properties.learningObjectives.result : "");

    learningObjectives = utils.formatLearningObjectives(learningObjectives);

    cmeReviewers = (checklistResult.properties.cmeReviewers ? checklistResult.properties.cmeReviewers.result : "");
    
    goalStatement = (checklistResult.properties.goalStatement ? checklistResult.properties.goalStatement.result : "")

    var abbreviationsMarkup = (checklistResult.properties.abbreviations ? checklistResult.properties.abbreviations.result : "");
    abbreviationsTOC = articleUtils.buildAbbreviations(abbreviationsMarkup, program);

    // Build Main TOC - Insert Brief Sections & Insert CME Test Section 
    var mainTOCInstance = new TOCElement();

    if (program.hasPreAssessment) {
        cmeTest = articleUtils.buildCMETestSection(3, "Pre-Assessment Question");
        mainTOCInstance.insertSectionElement(cmeTest);
    } 
    mainTOCInstance.insertSectionElement(clinicalContext);
    mainTOCInstance.insertSectionElement(synopsisAndPerspective);
    mainTOCInstance.insertSectionElement(studyHighlights);
    mainTOCInstance.insertSectionElement(clinicalImplications);
    if (program.hasPostAssessment) {
        cmeTest = articleUtils.buildCMETestSection(3, "Post-Assessment Question");
        mainTOCInstance.insertSectionElement(cmeTest);
    }
    
    // Build References TOC
    var referencesTOC = articleUtils.buildReferences(references, program);


    // Instantiate and Populate Article
    var finalArticle = new ProfArticle(program.profArticleType, program.hasOUS);
    // Set article title (pass text)
    finalArticle.title = title;
    // Set article byline (pass text)
    finalArticle.contrbtrByline = byline;
    // set contrbtr_pre_content
    finalArticle.contrbtrPreContent = checklistResult.properties.contrbtrPreContent.result;

    // set contrbtr_post_content with Medscape disclosure
    finalArticle.contrbtrPostContent = `<div>${snippets.activity.medscapeDisclosure()}</div>`;

    // set copyright holder 
    finalArticle.cpyrtHolder = checklistResult.properties.cpyrtHolder.result;
    // set backmatter front page 
    finalArticle.bkmtrFront = checklistResult.properties.bkmtrFront.result;
    finalArticle.insertSupporterGrantAttr(null); // passing null defaults to medscape.gif 
          
    // Build earn credit button section 
    var earnCreditSection = articleUtils.buildEarnCreditSection(program.qnaID);

    // If !hasPostAssessment --> mainTOCInstance.insertSectionElement()
    if (!program.hasPostAssessment) {
        mainTOCInstance.insertSectionElement(earnCreditSection);
    }

    // Insert Main TOC Object & Insert References TOC Object 
    finalArticle.insertTOCElement(mainTOCInstance);
    if (program.hasPostAssessment) {
        var blankAnswerTOC = articleUtils.buildBlankTOC(false);
        // Insert earnCreditSection in blankTOC 
        blankAnswerTOC.insertSectionElement(earnCreditSection);
        finalArticle.insertTOCElement(blankAnswerTOC);
    }
    finalArticle.insertTOCElement(referencesTOC);
    if(abbreviationsMarkup && abbreviationsMarkup.length){
        finalArticle.insertTOCElement(abbreviationsTOC)
    }

    //FIND IPCE Credit
    ipce = prodticket.getIPCE(ticket, program)

    var activityXML = activityClinicalBrief(program, title, targetAudience, learningObjectives, cmeReviewers, goalStatement, ipce);
    
    return {
        finishedArticleObject: finalArticle,
        checklistHTML: checklistResult.printHTML,
        activityXML: utils.cleanHTML.cleanEntities(activityXML)  
    };
};

module.exports = {
    getSynopsisAndPerspective,
    getClinicalContext,
    getStudyHighlights,
    getClinicalImplications,
    buildClinicalBrief
}