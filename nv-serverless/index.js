const serverless = require('serverless-http')
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require("body-parser");

// get body.
app.use(bodyParser.urlencoded({extended: true}));
// middleware for Access-Control-Allow-Origin
app.use(cors())

// -------------------------

const paidFunction = require('./functions/paid.js')
const checkoutFunction = require('./functions/checkout.js')
const lookupFunction = require('./functions/lookup.js')
const priceFunction = require('./functions/price.js')

// welcome message.
app.get('/', function (req, res) { res.send('namevault.co says hi') })

// get the current service price.
app.get('/price', priceFunction)

// perform an account availability lookup.
app.get('/lookup/:account', lookupFunction)

// create a payment checkout endpoint.
app.get('/checkout/:account/:owner/:active?', checkoutFunction)

// payment callback, after payment
app.post('/paid', paidFunction)

module.exports.handler = serverless(app);