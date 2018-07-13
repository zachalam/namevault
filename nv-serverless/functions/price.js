const getPrice = require('../helpers/price.js')

function price(req,res) {
    getPrice((price) => {
        res.status(200).json({success: true, price})
    })        
}

module.exports = price