const serverless = require('serverless-http')
const express = require('express')
const cors = require('cors')
const app = express()

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
        res.status(404).json({success: false, error: "Account not found"})
      })
})

// ---------------------

// create a payment checkout endpoint.
app.get('/checkout/:account', function (req, res) {
  let { account } = req.params
  coinbase.checkouts.create({
    "name": account,
    "description": "EOS Name Registration",
    "local_price": {
        "amount": config_cb.priceUSD,
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

module.exports.handler = serverless(app);