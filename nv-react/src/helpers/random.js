import randomWords from 'random-words'

export default () => {
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