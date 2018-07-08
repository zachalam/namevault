import React, { Component } from 'react'
import { Button, Input, Icon, Modal, Divider } from 'semantic-ui-react'
import ecc from 'eosjs-ecc'

class PayButton extends Component {

    state = {

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
            />
            <div className="spacer" />
            {!canSubmit ? '(A valid EOS public key is required)' : null}
        </div>
        )
    }

     
}


export default PayButton