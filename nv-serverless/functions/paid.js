const config_cb = require('../config/coinbase.js')
const { CoinbaseCommerce } = require('coinbase-commerce')
const coinbase = new CoinbaseCommerce(config_cb)

const registerName = require('../helpers/register.js')

function paid(req,res) {
    let { body } = req
    let signature = req.get('X-CC-Webhook-Signature')
    let isVerified = coinbase.verifyWebhookSignature(signature, body, config_cb.secret)


    // only register name if purchase came from coinbase.
    // sample of a webhook payload: https://commerce.coinbase.com/docs/api/#webhooks
    if(isVerified) {
        console.log("AUTHENTIC COINBASE WEBHOOK")
        let { event } = body
        if(event.type === 'charge:confirmed') {
            let { data } = event
            console.log('=====================')
            console.log('CHARGE WAS CONFIRMED!')
            // parse checkout description for public keys
            var keys = data.description.split(",")
            // map checkout data (from webhook) to new account.
            let newAccountName = data.name.trim()
            let newOwnerKey = keys[0].trim()
            // if a second key was provided it is the active key.
            let newActiveKey = (keys[1] ? keys[1] : keys[0]).trim()

            console.log("newAccountName", newAccountName)
            console.log("newOwnerKey", newOwnerKey)
            console.log("newActiveKey", newActiveKey)
            console.log('=====================')

            registerName(newAccountName,newOwnerKey,newActiveKey,(successful) => {
                res.status(200).json({success: true})
            })
        } else {
            // all coinbase messages respond with a 200.
            res.status(200).json({success: true, message: 'No action needed.'})
        }
    } else {
        // invalid payment request.
        console.log("INVALID COINBASE WEBHOOK")
        res.status(404).json({success: false, body, signature, error: "Invalid paid request."}) 
    }
     
}

module.exports = paid