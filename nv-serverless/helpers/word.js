'use strict';

const randomWords = require('random-words')

// a method that retrieves the price of the service.
function genWord() {
    let wordList = randomWords({exactly:25, wordsPerString:2, separator:''})
    let foundWord = wordList.find((e) => { return e.length === 12; });
    // check to see if we found one that was the correct length
    if(!foundWord) {
        // take the longest word, concat a number, and take substring.
        let longestWord = wordList.reduce(function(a, b) { 
            return a.length > b.length ? a : b
        }, '');
        let word = longestWord + '555555'
        foundWord = word.substring(0,12)
    }

    return foundWord
}

module.exports = genWord;