// a method that registers an account name on the EOS network.
const Eos = require('eosjs')
const config_eos = require('../config/eos.js')
const config_master = require('../config/master.js')
const eos = Eos(config_eos)

function register(newAccountName,newOwnerKey,newActiveKey,callback) {
    console.log("REGISTER ACCOUNT STARTED")

    // if there is a + in the account name, stake extra CPU/NET.
    let shouldStakeExtra = Boolean(newAccountName.indexOf("+") > 1)
    let stakeAmt = shouldStakeExtra ? '0.0600 EOS' : '0.0100 EOS'

    // remove the plus+ in the account name (if it was added).
    newAccountName = newAccountName.replace("+","")

    eos.transaction(tr => {
        tr.newaccount({
          creator: config_eos.creatorAccountName,
          name: newAccountName,
          owner: newOwnerKey,
          active: newActiveKey
        })
        tr.buyrambytes({
          payer: config_eos.creatorAccountName,
          receiver: newAccountName,
          bytes: 4000
        })
        tr.delegatebw({
          from: config_eos.creatorAccountName,
          receiver: newAccountName,
          stake_net_quantity: stakeAmt,
          stake_cpu_quantity: stakeAmt,
          transfer: 1
        })
    }).then((data) => {
        console.log("NEW EOS NAME REGISTERED")
        console.log(data)
        callback(true)  
    }).catch((e) => {
        let error = JSON.stringify(e);
        console.log("EOS REGISTRATION FAILURE")
        console.log(error)
        callback(false)
    })
}

module.exports = register;