// a method that registers an account name on the EOS network.
const Eos = require('eosjs')
const config_eos = require('../config/eos.js')
const eos = Eos(config_eos)

function register(newAccountName,newOwnerKey,newActiveKey) {
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
          stake_net_quantity: '0.0100 EOS',
          stake_cpu_quantity: '0.0100 EOS',
          transfer: 1
        })
    }).then((data) => {
        console.log("NEW EOS NAME REGISTERED")
        console.log(data);
      
    }).catch((e) => {
        let error = JSON.stringify(e);
        console.log("EOS REGISTRATION FAILURE")
        console.log(error);
      
    })
}

module.exports = register;