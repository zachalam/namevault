const Eos = require('eosjs')
const config_eos = require('../config/eos.js')
const eos = Eos(config_eos)

const config_cb = require('../config/coinbase.js')
const { CoinbaseCommerce } = require('coinbase-commerce')
const coinbase = new CoinbaseCommerce(config_cb)


function paid(req,res) {
    let { body } = req
    let signature = req.get('X-CC-Webhook-Signature')
    //let isVerified = coinbase.verifyWebhookSignature(signature, rawBody, config_cb.secret)
    
    // only register name if purchase came from coinbase.
    res.status(200).json({success: true, signature, body})
}

module.exports = paid