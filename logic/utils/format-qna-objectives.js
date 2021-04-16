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
        replacementText: 'Greater'
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
    if(typeof string != 'string' || !string.length) {
        return 'Error formatting objectives'
    }
    return 'Test FAIL'
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

   /*
    OLD CODE: (BROKEN)
        var flaggedString = setFlags(string);
        var result = formatPhrases(null, flaggedString, formatPhrases);
        // console.log("RESULT: ", result.replace(bulletSymbolRegex, ""));
        return result.replace(bulletSymbolRegex, "");
    */

    /**
     * Called once per unique objective group in the LO list. Finds the header text (Have greater, etc) and places it before each list item, then removes all tags and adds line breaks.
     * @param {String} str A unique objective group (Have greater...and a ul with sub items)
     * @returns {String} Plain text with all ul/li removed and replaced with appropriate line breaks.
     */
    const reduceObjective = (str) => {
        let header = str.match(/(?:<li>)(.*)(?:<ul>)/)[1]//Greater, increased, etc.
        function joinObjective(match, p1, offset, string) {
            return header + " " + p1.toLowerCase()
        }
        str = str.replace(/<\/li>$/, '').replace(/^<li>/, '')//Remove starting and ending li
        let items = str.match(/<li>(?:(?!<\/li>).)+<\/li>/g)//Find each li element text
        return items.reduce((prev, curr) => {
            prev += curr.replace(/<li>(.)/, joinObjective).replace(/<\/li>/, "\n")//Add the header to each, remove capitolization, add line break and replace lis
            return prev
        }, '')
    }

    //Remove all line breaks, starting and ending <ul>s, and extra spaces from the LOs
    let newObjectives = ''
    let formattedQNAObjectives = string
        .replace(/\r?\n|\r/g, '')
        .replace(/^<ul>/, '').replace(/<\/ul>$/, '').replace(/[ ]{2,}/g, ' ')
    
    //Search through all of the keywords to see if any of them exist in the arg string. Each match is replaced with replacementText.
    let foundMatch = false
    objectList.forEach(item => {
        if(item.matchText.test(formattedQNAObjectives)){
            foundMatch = true
            formattedQNAObjectives = formattedQNAObjectives.replace(item.matchText, item.replacementText)
        }
    })

    if(!!foundMatch) { //If the LOs contain at least one of the keywords from objectList:

        //Regex here = one or more groups of characters that don't include </ul>. This splits the list into distinct objectives.
        let uniqueObjectives = formattedQNAObjectives.match(/(?:(?!<\/ul>).)+<\/ul><\/li>/g)

        if(uniqueObjectives && uniqueObjectives.length > 0) {

            //Take the match result (Array) and reduce it to a string by parsing each match with reduceObjective() <- See above.
            newObjectives = uniqueObjectives.reduce((prev, curr) => {
                prev += reduceObjective(curr)
                return prev
            }, '')
        }else{
            newObjectives = 'Error formatting objectives.'
        }
        return newObjectives
    }else { //If no keywords are found, just return the list with line breaks instead of ul/li elements.
        return formattedQNAObjectives
            .replace(/<\/li>/g, "\n")
            .replace(/<li>/g, '')
            .replace(/\n\s+/g, '\n').trim()
    }
}

module.exports = formatQNAObjectives;