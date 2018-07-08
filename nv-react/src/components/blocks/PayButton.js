import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import ecc from 'eosjs-ecc'
import MasterConfig from '../../config/Master'

class PayButton extends Component {

    state = {
        isLoading: false
    }

    getCheckout = () => {
        let { name, ownerPublic, activePublic } = this.props
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
        let { ownerPublic, activePublic, accountPrice } = this.props

        // to submit, the `ownerPublic` key MUST be present AND valid.
        // an `activePublic` key is optional, but if present MUST be valid.
        let canSubmit = ecc.isValidPublic(ownerPublic) 
            && (!activePublic.length || ecc.isValidPublic(activePublic))

        return (
        <div>
            {!canSubmit ? <div>A <u>valid</u> EOS public key is required.<div className="spacer" /></div> : null}
            <Button 
                positive 
                icon='cart' 
                content={`Proceed To Coinbase: $${accountPrice} USD`}
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