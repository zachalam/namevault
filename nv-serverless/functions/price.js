const getPrice = require('../helpers/price.js')

function price(req,res) {
    getPrice((price,extraPrice) => {
        res.status(200).json({success: true, price, extraPrice})
    })        
}

module.exports = price