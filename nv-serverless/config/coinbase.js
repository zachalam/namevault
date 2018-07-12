'use strict';

var keys = require('./keys')

module.exports = {
    version:'2018-03-22',
    apiKey: keys.coinbase_api, // WIF string or array of keys..
    secret: keys.coinbase_secret,
    httpEndpoint: 'https://commerce.coinbase.com/checkout'
}