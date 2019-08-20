//==============================================
//===========Algoritmo de Levenshtain===========
//==============================================
let weights = [];
let MaxPercentWord = [];
//Position 0 : Percent ------- Position 1: Word

let regionsDictionary = require('./regionsDictionary');
// entries = dictionary;
/**
 * 
 * @param {*} strg1 string to compare with dictonary
 * @param {*} strings strings to create dictionary
 * @param {*} callback response from function
 */
const compareStrings = (strg1, strgs, callback) => {
    //generating dictionary
    let entries = strgs;
    console.log("recibi la palabra ", strg1);
    var k = 0;
    for (let i = 0; i < entries.length; i++) {
        for (let j = 0; j < entries[i].synonym.length; j++) {
            weights[k] = similarity(strg1, entries[i].synonym[j]);
            if (k == 0) {
                MaxPercentWord[0] = weights[k];
                MaxPercentWord[1] = entries[i].value;
            } else if (weights[k] > MaxPercentWord[0]) {
                MaxPercentWord[0] = weights[k];
                MaxPercentWord[1] = entries[i].value;
            }
            k = k + 1;
        }
    }
    //finding the agency
    console.log(`Palabra encontrada: ${MaxPercentWord}`);
    if (MaxPercentWord[0]>0.6) {
        callback(MaxPercentWord[1]);
    } else {
        callback(false);
    }
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i < s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return (costs[s2.length]);
}

function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    let percent = (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    //console.log(s1 + ' y ' + s2 + ' es:               ' + percent);
    return percent;
}


module.exports = {
    compareStrings
}