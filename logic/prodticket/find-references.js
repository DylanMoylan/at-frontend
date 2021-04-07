const config = require('../config');
const {stringOps, cleanHTML} = require('../utils');

var exportObject = {};

const briefEndRegexps = [
    /<strong>Tagging Info/g,
    /<\/body>/g
]
// Clinical Brief
exportObject[config.programs.clinicalBrief.codeName] = function (ticketHTML) {
    let endRegExp = stringOps.getAllMatchesInOrder(ticketHTML, briefEndRegexps)
    if(endRegExp.length <=0) {
        throw new Error("No references found in the prodticket");
    }else{
        var {textBlock} = stringOps.getTextBlock(ticketHTML, "<strong>References", endRegExp[endRegExp.length - 1].symbol);
        textBlock = cleanHTML.references(textBlock).trim();
    
        if (stringOps.isEmptyString(textBlock) || stringOps.isBlankOrWhiteSpace(textBlock) || textBlock.length < 10) {
            throw new Error("No references found in the prodticket");
        } else {
            return "<ol>" + cleanHTML.singleLine(textBlock) + "</ol>";
        }
    }
}

// Spotlight
exportObject[config.programs.spotlight.codeName] = function (ticketHTML) {
    var {textBlock} = stringOps.getTextBlock(ticketHTML, "<strong>References", "</html>");
    textBlock = cleanHTML.references(textBlock).trim(); 

    if (stringOps.isEmptyString(textBlock) || stringOps.isBlankOrWhiteSpace(textBlock) || textBlock.length < 10) {
        throw new Error("No references found in the prodticket");
    } else {
        return "<ol>" + cleanHTML.singleLine(textBlock) + "</ol>";
    }
}

// Curbside
exportObject[config.programs.curbsideConsult.codeName] = function (ticketHTML) {
    return exportObject[config.programs.spotlight.codeName](ticketHTML);
}

// Video Lecture
exportObject[config.programs.videoLecture.codeName] = function (ticketHTML) {
    return exportObject[config.programs.spotlight.codeName](ticketHTML);
}

// First Response 
exportObject[config.programs.firstResponse.codeName] = function (ticketHTML) {
    return exportObject[config.programs.spotlight.codeName](ticketHTML);
}

// Town Hall Enduring
exportObject[config.programs.townHall.codeName] = function (ticketHTML) {
    return exportObject[config.programs.spotlight.codeName](ticketHTML);
}

// Town Hall Cert  
exportObject[config.programs.townHallCert.codeName] = function (ticketHTML) {
    var {textBlock} = stringOps.getTextBlock(ticketHTML, "</a>References (for enduring version only)", "</html>");
    textBlock = cleanHTML.references(textBlock).trim(); 
    
    if (stringOps.isEmptyString(textBlock) || stringOps.isBlankOrWhiteSpace(textBlock) || textBlock.length < 10) {
        throw new Error("No references found in the prodticket");
    } else {
        return "<ol>" + cleanHTML.singleLine(textBlock) + "</ol>";
    }
}

// Test and Teach  
exportObject[config.programs.testAndTeach.codeName] = function (ticketHTML) {
    return exportObject[config.programs.spotlight.codeName](ticketHTML);
};

module.exports = exportObject;