import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'

class SuccessModal extends Component {
    
    state = {
        open: this.props.open
    }
    close = () => { this.setState({open: false})}

    componentDidUpdate(prevProps) {
        if(prevProps.open !== this.props.open)
            this.setState({open: this.props.open})
    }    

    render() {

        // dont render a modal if no checkout info is available.
        if(!window.checkout) return null

        let { checkout } = window

        return ( 
            <Modal closeIcon size='tiny' dimmer='blurring' open={this.state.open} onClose={this.close}>
                <Modal.Content>

                    <h2>Payment Pending..</h2>
                    We've opened a new tab to accept your payment (make sure popups are enabled for this domain).
                    <br /><br />
                    Your name will be <b>assigned immediately</b> after <u>confirmed</u> payment.
                    <br /><br />
                    <a href={checkout.redirect} target="_blank">re-open checkout</a>

                </Modal.Content>
            </Modal>
        )    
    }
}


export default SuccessModal