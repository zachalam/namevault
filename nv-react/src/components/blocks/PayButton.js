import React, { Component } from 'react'
import { Button, Input, Icon, Modal, Divider } from 'semantic-ui-react'
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
          window.location=checkout.redirect
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
            <Button 
                positive 
                icon='cart' 
                content={`Proceed To Coinbase: $${accountPrice}`}
                disabled={!canSubmit} 
                loading={this.state.isLoading}
                onClick={this.getCheckout}
            />
            <div className="spacer" />
            {!canSubmit ? '(A valid EOS public key is required)' : null}
        </div>
        )
    }

     
}


export default PayButton