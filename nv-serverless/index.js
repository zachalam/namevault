const serverless = require('serverless-http')
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require("body-parser");

// get body.
app.use(bodyParser.urlencoded({extended: true}));
// middleware for Access-Control-Allow-Origin
app.use(cors())

const Eos = require('eosjs')
const config_eos = require('./config/eos.js')
const eos = Eos(config_eos)

const config_cb = require('./config/coinbase.js')
const { CoinbaseCommerce } = require('coinbase-commerce')
const coinbase = new CoinbaseCommerce(config_cb)

const getPrice = require('./helpers/price.js')

app.get('/', function (req, res) {
  res.send('namevault.co api')
})

app.get('/price', function (req,res) {
  // this call ALWAYS returns a price.
  getPrice((price) => {
    res.status(200).json({success: true, price})
  })
  
})

// ---------------------

// perform an account lookup.
app.get('/lookup/:account', function (req, res) {
  let { account } = req.params
  eos.getAccount(account)
      .then((details) => {
        res.status(200).json({success: true, account, details})
      })
      .catch((error) => {
        console.log(error)
        res.status(404).json({success: false, account, error: "Account not found"})
      })
})

// ---------------------

// create a payment checkout endpoint.
app.get('/checkout/:account/:owner/:active?', function (req, res) {
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
})

// payment callback, after payment
app.post('/paid', function (req, res) {  
  let { body } = req
  let signature = req.get('X-CC-Webhook-Signature')
  //let isVerified = coinbase.verifyWebhookSignature(signature, rawBody, config_cb.secret)
  res.status(200).json({success: true, signature, body})
})

module.exports.handler = serverless(app);