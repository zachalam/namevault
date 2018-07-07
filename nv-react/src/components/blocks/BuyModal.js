import React, { Component } from 'react'
import { Button, Input, Icon, Modal } from 'semantic-ui-react'
import FadeIn from 'react-fade-in'

class BuyModal extends Component {

    state = {
        open: false
    }

    open = () => { this.setState({open: true})}
    close = () => { this.setState({open: false})}

    render() {
        let { accountPrice } = this.props

        return (
        <div>
            <Button 
                positive 
                fluid 
                size='big' 
                icon='checkmark' 
                labelPosition='right' 
                onClick={this.open}
                content={`Buy Name: $${accountPrice} USD`}
            />
            <Modal closeIcon size='tiny' dimmer='blurring' open={this.state.open} onClose={this.close}>
                <Modal.Content>
                <p>Let's create your account!</p>
                </Modal.Content>
                <Modal.Actions>
                <Button negative>No</Button>
                <Button positive icon='checkmark' labelPosition='right' content='Yes' />
                </Modal.Actions>
            </Modal>
        </div>
        )
    }

     
}


export default BuyModal