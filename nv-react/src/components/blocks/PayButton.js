import React, { Component } from 'react'
import { Checkbox, Button } from 'semantic-ui-react'
import ecc from 'eosjs-ecc'
import MasterConfig from '../../config/Master'

class PayButton extends Component {

    state = {
        isLoading: false,
        wantsExtra: false
    }

    wantsExtra = () => {
        let { wantsExtra } = this.state
        this.setState({wantsExtra: !wantsExtra})
    }

    getName = () => {
        // add a plus to the order name (if extra stake is wanted).
        let { wantsExtra } = this.state
        let { name } = this.props
        return wantsExtra ? `${name}+` : name
    }

    getPrice = () => {
        let { wantsExtra } = this.state        
        let { accountPrice, extraPrice } = this.props
        return wantsExtra ? accountPrice+extraPrice : accountPrice
    }

    getCheckout = () => {
        let { ownerPublic, activePublic } = this.props
        let name = this.getName()
        // set loading status.
        this.setState({isLoading:true})
        // get checkout.
        fetch(`${MasterConfig.httpEndpoint}/checkout/${name}/${ownerPublic}/${activePublic}`)
        .then(response => response.json())
        .then((checkout) => {
          // save last checkout object
          window.checkout=checkout
          // open checkout
          window.open(checkout.redirect)
          // hide current modal
          this.props.closeBuyModal()
          // show success modal
          this.props.showSuccessModal()
        });
    }

    render() {
        let { ownerPublic, activePublic } = this.props
        let { wantsExtra } = this.state

        // to submit, the `ownerPublic` key MUST be present AND valid.
        // an `activePublic` key is optional, but if present MUST be valid.
        let canSubmit = ecc.isValidPublic(ownerPublic) 
            && (!activePublic.length || ecc.isValidPublic(activePublic))

        return (
        <div align={'center'}>
            {!canSubmit ? <div>A <u>valid</u> EOS public key is required.</div> : 
            <div><Checkbox onClick={this.wantsExtra} defaultChecked={wantsExtra}
            label={`Get 0.12 EOS (6x more) for just $1 extra.`} /></div> }
            <div className="spacer" />
            <Button 
                positive 
                fluid
                icon='cart' 
                content={`Proceed To Coinbase: $${this.getPrice()} USD`}
                disabled={!canSubmit} 
                loading={this.state.isLoading}
                onClick={this.getCheckout}
            />
            <div className="spacer" />
        </div>
        )
    }

     
}


export default PayButton