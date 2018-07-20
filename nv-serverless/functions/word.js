const getWord = require('../helpers/word.js')

function word(req,res) {
    // optional word (less than 12 chars) to use as the base of the random word.
    let { baseWord } = req.params   
    res.status(200).json({success: true, word: getWord(baseWord)})    
}

module.exports = word