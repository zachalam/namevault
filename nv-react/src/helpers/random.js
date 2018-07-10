import randomWords from 'random-words'

export default () => {
    let wordList = randomWords({exactly:25, wordsPerString:2, separator:''})
    let foundWord = wordList.find((e) => { return e.length === 12; });
    // check to see if we found one that was the correct length
    if(!foundWord) {
        // take the first word, concat number, and take substring.
        let word = wordList[0] + '9999999'
        foundWord = word.substring(0,12)
    }

    return foundWord
}