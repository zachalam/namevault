'use strict';

const getJSON = require('get-json')
const Eos = require('eosjs')

const config_cmc = require('../config/coinmarketcap.js')
const config_master = require('../config/master.js')

const config_eos = require('../config/eos.js')
const eos = Eos(config_eos)

// a method that retrieves the price of the service.
function getPrice(callback) {

    var getJSON = require('get-json')
    
    getJSON(config_cmc.httpEndpoint, function(err,market){
        
        if(err) {
            // unable to retrieve market data for EOS.
            callback(config_master.fallbackPricing)
        }
    
        // get ram price.
        eos.getTableRows(true, 'eosio', 'eosio', 'rammarket', 'id', 0, -1, 1)
            .then((ramdata) => {
    
                // get ram price in EOS.
                let ramtable = ramdata.rows[0]
                let base = ramtable['base']['balance'].split(' ')[0]
                let quote = ramtable['quote']['balance'].split(' ')[0]
                let ramprice_in_eos = 1024 * parseFloat(quote)/parseFloat(base)
    
                // get EOS price in USD
                let { price } = market.data.quotes.USD;
    
                // service price calculated via:
                // ((4*ramprice_in_eos)*price) + (0.2*price) + standardMarkup
                // 4kb + 0.2eos are sent to owner as part of purchase.
                let total_price = Math.ceil((4*ramprice_in_eos)*price) + 
                Math.ceil(0.2*price) + Math.ceil(config_master.standardMarkup)
    
                callback(total_price)
            })
            .catch((error) => {
                // unable to retrieve market data for RAM.
                callback(config_master.fallbackPricing)
            })
    
        //res.status(200).json({success: true, market}) market contains ether price.
    })

}

module.exports = getPrice;