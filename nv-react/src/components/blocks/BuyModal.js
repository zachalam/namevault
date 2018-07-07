import React, { Component } from 'react'
import { Button, Input, Icon, Modal, Divider } from 'semantic-ui-react'
import ecc from 'eosjs-ecc'

class BuyModal extends Component {

    state = {
        open: false,
        ownerPrivate: '',   // owner prv/pub key pair
        ownerPublic: '',
        activePrivate: '',  // active prv/pub key pair
        activePublic: ''
    }

    open = () => { this.setState({open: true})}
    close = () => { this.setState({open: false})}

    genKey = (genOwner=true) => {
        // generates a public private key pair.
        // genOwner == true ? update 'owner', otherwise update 'active'
        console.log(genOwner);
        console.log("gen for owner");

        ecc.randomKey().then(privateKey => {
            let publicKey = ecc.privateToPublic(privateKey)
            if(genOwner) {
                // save for owner
                this.setState({
                    ownerPrivate: privateKey,
                    ownerPublic: publicKey
                })
            } else {
                // save for active
                this.setState({
                    activePrivate: privateKey,
                    activePublic: publicKey
                })
            }

        })
    }

    render() {
        let { searchResponse, accountPrice } = this.props

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
                    <h1><Icon name='user circle' /> {searchResponse.account}</h1>
                    <p>Let's get your name registered on the EOS network.</p>
                    <Divider />
                    <h3>Owner Public Key &nbsp; <Button size='mini' onClick={() => {this.genKey(true)}}>need one?</Button></h3>
                    <div className="spacer" />
                    <Input placeholder='EOS8mUGcoTi12WMLtTfYFGBSFCtHUSVq15h3XUoMhiAXyRPtTgZjb' value={this.state.ownerPublic} fluid />
                    {this.state.ownerPrivate ? <Input
                                                    defaultValue={this.state.ownerPrivate} size='mini' fluid
                                                /> : null}
                    <div className="spacer" />
                    <a href="#">+ add active public key (not required)</a>
                </Modal.Content>
                <Modal.Actions>
                    <Button positive 
                    icon='checkmark' 
                    content={`Proceed To Coinbase: $${accountPrice}`}
                    disabled={!ecc.isValidPublic(this.state.ownerPublic)} />
                </Modal.Actions>
            </Modal>
        </div>
        )
    }

     
}


export default BuyModal