const config = require('../config')
const {stringOps, cleanHTML} = require('../utils')

var exportObject = {}

// Clinical Brief
exportObject[config.programs.clinicalBrief.codeName] = function (ticketHTML) {
    let result
    const startRegExp = /<p>[ ]?(&#9746;|&#9744;)[ ]?<strong>[ ]?IPCE.*/g
    const endRegExp = /learning and change.*/g
    const {textBlock} = stringOps.getTextBlock(ticketHTML, startRegExp, endRegExp, false, true)

    if (stringOps.isEmptyString(textBlock) || stringOps.isBlankOrWhiteSpace(textBlock) || textBlock.length < 10) {
        throw new Error("IPCE not found in the prodticket")
    } else {  
        if(/&#9746;/.test(textBlock)) {
            result = textBlock.match(/<strong>IPCE:<\/strong>(?:[ ]+)?([0-9.]{2,})/)
            console.log('result: ', result);
            if(result && result.length && result[1]){
                return result[1]
            }else{
                throw new Error("IPCE credit amount not found in the prodticket")
            }
        }else{
            return null
        }
    }
}

module.exports = exportObject