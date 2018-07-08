'use strict';

var keys = require('./keys')

module.exports = {
    version:'2018-03-22',
    apiKey: keys.coinbase_api, // WIF string or array of keys..
    httpEndpoint: 'https://commerce.coinbase.com/checkout'
}