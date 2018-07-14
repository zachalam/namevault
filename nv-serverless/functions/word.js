const getWord = require('../helpers/word.js')

function word(req,res) {
    res.status(200).json({success: true, word: getWord()})    
}

module.exports = word