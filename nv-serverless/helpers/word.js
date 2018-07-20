'use strict';

const randomWords = require('random-words')
const MasterConfig = require('../config/master')

// a method that retrieves the price of the service.
function genWord(baseWord='') {

    let wordLengthNeeded = MasterConfig.requiredChars
    let wordsPerString = 2

    if(baseWord) {
        // a base word was provided - use it as the start of the random word.
        wordLengthNeeded = MasterConfig.requiredChars - baseWord.length
        wordsPerString = 1
    } 


    let wordList = randomWords({exactly:25, wordsPerString, separator:''})
    let foundWord = wordList.find((e) => { return e.length === wordLengthNeeded; });
    // check to see if we found one that was the correct length
    if(!foundWord) {
        // take the longest word, concat a number, and take substring.
        let longestWord = wordList.reduce(function(a, b) { 
            return a.length > b.length ? a : b
        }, '');
        let word = longestWord + '555555'
        foundWord = word.substring(0,wordLengthNeeded)
    }

    return baseWord+foundWord
}

module.exports = genWord;