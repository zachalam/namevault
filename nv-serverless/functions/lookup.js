const Eos = require('eosjs')
const config_eos = require('../config/eos.js')
const eos = Eos(config_eos)

function lookup(req,res) {
    let { account } = req.params
    eos.getAccount(account)
        .then((details) => {
          res.status(200).json({success: true, account, details})
        })
        .catch((error) => {
          console.log(error)
          res.status(404).json({success: false, account, error: "Account not found"})
        })
}

module.exports = lookup