'use strict';

var keys = require('./keys')

module.exports = {
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906', // 32 byte (64 char) hex string
    keyProvider: [keys.eos_pk], // WIF string or array of keys..
    httpEndpoint: 'https://publicapi-mainnet.eosauthority.com',
    expireInSeconds: 60,
    broadcast: true,
    verbose: false, // API activity
    sign: true,
    creatorAccountName: 'blockexpress'
}