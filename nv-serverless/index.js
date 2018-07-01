const serverless = require('serverless-http')
const express = require('express')
const app = express()

const Eos = require('eosjs')
const config_eos = require('./config/eos.js')
const eos = Eos(config_eos)

app.get('/', function (req, res) {
  res.send('namevault.co api')
})

// perform an account lookup on eos net.
app.get('/lookup/:account', function (req, res) {
  let { account } = req.params
  eos.getAccount(account)
      .then((account) => {
        res.status(200).json(account)
      })
      .catch((error) => {
        res.status(404).json({error: "Account not found"})
      })
})



module.exports.handler = serverless(app);