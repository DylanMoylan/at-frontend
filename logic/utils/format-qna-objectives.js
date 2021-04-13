const _ = require('lodash');
const cleanHTML = require('./clean-html');
const formatList = require('./format-list');
const stringOps = require('./string-ops');
const isBlankOrWhiteSpace = stringOps.isBlankOrWhiteSpace;

const bulletSymbol = `&#8226;`;
const bulletSymbolRegex = new RegExp(`${bulletSymbol}`, 'g');
// const subBulletSymbol = `<tt>o`;
// const subSubBulletSymbol = `&#9642;`;
let wordList = [
    'Have greater',
    'Have increased',
    'Have improved',
    'Demonstrate greater',
    'Demonstrate increased',
    'Demonstrate improved'
];

let objectList = [
    {
        matchText: /Have greater/i,
        replacementText: 'Greater',
        context: /Have greater/
    },
    {
        matchText: /Have increased/i,
        replacementText: 'Increased'
    },
    {
        matchText: /Have improved/i,
        replacementText: 'Improved'
    },
    {
        matchText: /Demonstrate greater/i,
        replacementText: 'Greater'
    },
    {
        matchText: /Demonstrate increased/i,
        replacementText: 'Increased'
    },
    {
        matchText: /Demonstrate improved/i,
        replacementText: 'Improved'
    }
]

let setFlags = function (string) {
    var str = cleanHTML.plainText(string);
    var regex = null;
    // var hasSubLists = false;
    var index = -1;
    // Put bulletSymbol as flag before each instance of item in wordList
    for (var i = 0; i < wordList.length; i++) {
        regex = new RegExp(`(${wordList[i]}.*)`, 'g');
        index = stringOps.regexIndexOf(str, regex);
        if (index != -1) {
            str = str.replace(regex, `${bulletSymbol}$1`);
            // hasSubLists = true;
        }
    }

    return str;   
}

let insertReplacementText = function (string) {
    var result = "";
    for (var i = 0; i < objectList.length; i++) {
        if (string.indexOf(objectList[i].matchText) != -1) {
            result = string.replace(objectList[i].matchText, objectList[i].replacementText);
            break;
        }
    }
    return result;
}

let formatPhrases = function (startingPhrase, remainingString, fn) {
    // console.log("REMAINING STRING: ", remainingString);
    if (isBlankOrWhiteSpace(remainingString)) {
        return "";
    }

    let newLineRegExp = new RegExp('.*', 'g');
    var matchArray = remainingString.match(newLineRegExp);
    var currentLine = "";
    var currentLineMatchIndex = 0;
    for(var i = 0; i < matchArray.length && isBlankOrWhiteSpace(currentLine); i++) {
        currentLine = matchArray[i];
        currentLineMatchIndex = i;
    }  


    var nextLine = ""; 
    for(var i = currentLineMatchIndex + 1; i < matchArray.length && isBlankOrWhiteSpace(nextLine); i++) {
        nextLine = matchArray[i];
    } 

    var nextLineIndex = -1;
    // var logString = "";
    // logString +=`CURRENT LINE: ${currentLine} \n\n`;
    // logString +=`NEXT LINE: ${nextLine} \n\n\n\n`; 
    // console.log("LOG STRING: ", logString);
    if (nextLine === currentLine) {
        nextLineIndex = remainingString.indexOf(nextLine) + nextLine.length;
    } else {
        nextLineIndex = remainingString.indexOf(currentLine) + currentLine.length;
    } 

    var flagIndex = stringOps.regexIndexOf(currentLine, bulletSymbolRegex);

    if (flagIndex != -1) {
        startingPhrase = insertReplacementText(currentLine); 
        currentLine = startingPhrase + " " + nextLine.trim().charAt(0).toLowerCase() + nextLine.trim().substring(1);
        nextLineIndex = remainingString.indexOf(nextLine) + nextLine.length;
    } else {
        // - prepend currentLine to startingPhrase
        if (startingPhrase) {
            currentLine = currentLine.trim().charAt(0).toLowerCase() + currentLine.trim().substring(1); 
            currentLine = startingPhrase + " " + currentLine; 
        } else {
            currentLine = currentLine.trim();
        }
    }

    remainingString = remainingString.substring(nextLineIndex);
    return currentLine + "\n\r\n" + fn(startingPhrase, remainingString, formatPhrases);
}

let formatQNAObjectives = function(string) {
    /*
    Algorithm:
    - setFlags()
        - clean to be plaintext. 
        - put flag before each match in wordList - done 
    
    - formatPhrases()
        - Loop through each line - use recursion 
        - If line starts with flag
            // Replace beginning of line with replacement text
            - startingPhrase = insertReplacementText(currentLine) 
            - currentLine = startingPhrase + nextLine.charAt(0).toLowerCase();
        - If doesn't start with flag
            - currentLine = currentLine.charAt(0).toLowerCase(); 
            - currentLine = startingPhrase + " " + currentLine 
            - prepend currentLine to startingPhrase
        - remainingString = remainingString.substring(nextLineIndex);
        - return currentLine + fn(startingPhrase, remainingString, formatPhrases)
    - Replace flags with line breaks \n  
    */
//    var flaggedString = setFlags(string);
//    var result = formatPhrases(null, flaggedString, formatPhrases);
//    // console.log("RESULT: ", result.replace(bulletSymbolRegex, ""));
//    return result.replace(bulletSymbolRegex, "");

    /**
     * INPUT:
     * 
     * <ul>
     *  <li>Have increased knowledge regarding the
     *      <ul>
     *          <li>Clinical trial data on the use of immune checkpoint inhibitors (ICIs) as monotherapy or in combination with other agents in advanced esophageal and gastric cancer in the first and second-line setting</li>
     *          <li>Role of biomarkers in the management of patients with advanced esophageal and gastric cancer</li>
     *      </ul>
     *  </li>
     *  <li>Demonstrate greater confidence in their ability to
     *      <ul>
     *          <li>Understand which patients may be eligible for treatment with emerging ICI strategies</li>
     *      </ul>
     *  </li>
     * </ul>
     * 
     * OUTPUT:
     * 
     * Increased knowledge regarding the clinical trial data on the use of immune checkpoint inhibitors (ICIs) as monotherapy or in combination with other agents in advanced esophageal and gastric cancer in the first and second-line setting
     * Increased knowledge regarding the role of biomarkers in the management of patients with advanced esophageal and gastric cancer
     * 
     * Greater confidence in their ability to understand which patients may be eligible for treatment with emerging ICI strategies
     * 
     * 
     * New algo:
     * Accept already formatted learningObjectives as arg.
     *  :: Problem: Heading groups ("Have Increased") need to be repeated for each sub element before being removed.
     * - replace all line breaks
     * - replace starting and ending <ul>s
     * - 
     * - replace the remaining </ul> tags with line breaks
     * - remove any remaining tags
     * - remove any double spaces and trim.
     */
    function toLower(match, p1, offset, string) {
        return p1.toLowerCase()
    }
    let formattedQNAObjectives = string
        .replace(/\r?\n|\r/g, '') //Remove all line breaks
        .replace(/^<ul>/, '').replace(/<\/ul>$/, '') //Remove starting/trailing <ul></ul>
        .replace(/<\/ul>/g, "\n") //Replace </ul> with newline
        .replace(/<li>(.)/g, toLower)
        .replace(/<[^>]+>/g, ' ')
        .replace(/[ ]+/g, ' ').trim()
        objectList.forEach(item => {
            formattedQNAObjectives = formattedQNAObjectives.replace(item.matchText, item.replacementText)
        })
        return formattedQNAObjectives
}

module.exports = formatQNAObjectives;