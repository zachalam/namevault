const config_cb = require('../config/coinbase.js')
const { CoinbaseCommerce } = require('coinbase-commerce')
const coinbase = new CoinbaseCommerce(config_cb)

const getPrice = require('../helpers/price.js')


function checkout(req,res) {
    let { account, owner, active } = req.params
    let theDescription = [owner,active].filter((v) => {return v}).join(", ")
  
    // get last price before creating checkout.
    getPrice((latest_price) => {
      // create coinbase checkout.
      coinbase.checkouts.create({
        "name": account,
        "description": theDescription,
        "local_price": {
            "amount": latest_price,
            "currency": "USD"
        },
        "pricing_type": "fixed_price",
        "requested_info": []
      })
      .then((checkout) => {
        res.status(200).json({success: true, checkout, 
          redirect: `${config_cb.httpEndpoint}/${checkout.data.id}`})
      })
      .catch((error) => {
        console.log(error)
        res.status(404).json({success: false, error: "Could not create checkout."})
      })
    })
}

module.exports = checkout