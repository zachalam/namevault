import React, { Component } from 'react'
import { Modal, Label, Button } from 'semantic-ui-react'

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
        let { data } = checkout.checkout

        return ( 
            <Modal closeIcon size='mini' dimmer='blurring' open={this.state.open} onClose={this.close}>
                <Modal.Content>

                    <h2>Payment Pending..</h2>
                    We've opened a new tab to accept your payment (make sure popups are enabled for this domain).
                    <br /><br />
                    The account, <Label color='blue'>{data.name}</Label> will be assigned to you. <u><b>After</b></u> the payment is confirmed, <a href={`https://eospark.com/MainNet/account/${data.name}`} target="_blank">visit this 3rd party link to see your name on the EOS blockchain</a>.
                    <br /><br />
                    <Button href={checkout.redirect} target="_blank">re-open checkout</Button>

                </Modal.Content>
            </Modal>
        )    
    }
}


export default SuccessModal