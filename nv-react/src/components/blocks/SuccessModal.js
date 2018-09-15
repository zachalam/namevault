import React, { Component } from 'react'
import { Modal, Label, Form, Button } from 'semantic-ui-react'
import config_master from '../../config/Master'

class SuccessModal extends Component {
    
    state = {
        open: this.props.open
    }
    close = () => { this.setState({open: false})}

    componentDidUpdate(prevProps) {
        if(Boolean(prevProps.open) !== Boolean(this.props.open))
            this.setState({open: this.props.open})
    }    

    render() {

        // dont render a modal if no checkout info is available.
        if(!window.checkout) return null

        let { checkout } = window

        return ( 
            <Modal closeIcon size='mini' dimmer='blurring' open={this.state.open} onClose={this.close}>
                <Modal.Content>

                    <h2>Payment Pending..</h2>
                    We've opened a new tab to accept your payment (ensure <u>popups are enabled</u> here).
                    <br /><br />
                    The account, <Label>{checkout.accountName}</Label>, will be assigned after payment. Once confirmed, <a href={`${config_master.nameLookup}/${checkout.accountName}`} target="_blank">view your name on the EOS blockchain here</a>.
                    <br /><br /><br />

                    <Form.Field inline>
                        <Button href={checkout.redirect} color='red' target="_blank">re-open checkout</Button>
                        <Label basic pointing='left'>
                            <span>pay HERE!</span>
                        </Label>
                    </Form.Field>
                
                </Modal.Content>
            </Modal>
        )    
    }
}


export default SuccessModal