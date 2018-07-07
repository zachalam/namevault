import React, { Component } from 'react'
import { Button, Input, Icon, Modal, Divider } from 'semantic-ui-react'
import ecc from 'eosjs-ecc'

class BuyModal extends Component {

    state = {
        open: false,
        ownerPrivate: '',   // owner prv/pub key pair
        ownerPublic: '',
        ownerLoading: false,
        activePrivate: '',  // active prv/pub key pair
        activePublic: '',
        activeLoading: false,
        showActivePair: false // show the active keypair
    }

    open = () => { this.setState({open: true})}
    close = () => { this.setState({open: false})}
    showActive = () => { this.setState({showActivePair:true}) }

    genKeyPair = (genType='owner') => {
        // generates a public private key pair.
        // set loading.
        this.setState({[`${genType}Loading`]:true})
        
        ecc.randomKey().then(privateKey => {
            let publicKey = ecc.privateToPublic(privateKey)
            console.log("private key is", privateKey)
            if(genType==='owner') {
                // save for owner
                this.setState({
                    ownerPrivate: privateKey,
                    ownerPublic: publicKey,
                    ownerLoading: false
                })
            } else {
                // save for active
                this.setState({
                    activePrivate: privateKey,
                    activePublic: publicKey,
                    activeLoading: false
                })
            }

        })
    }

    renderKeyInputs = (isOwnerRender) => {

        // generate inputs for active or owner keys.
        let genType = isOwnerRender ? 'owner' : 'active'
        let pubKey = isOwnerRender ? this.state.ownerPublic : this.state.activePublic
        let privKey = isOwnerRender ? this.state.ownerPrivate : this.state.activePrivate

        return (
        <div>
            <h3>{genType} public key &nbsp; <Button size='mini' onClick={() => {this.genKeyPair(genType)}} 
            loading={this.state[`${genType}Loading`]}>need one?</Button></h3>
            <div className="spacer" />
            <Input placeholder='EOS8mUGcoTi12WMLtTfYFGBSFCtHUSVq15h3XUoMhiAXyRPtTgZjb' value={pubKey} fluid />
            {privKey ? 
                <Input 
                    value={privKey} 
                    size='mini' 
                    label={{ icon: 'key' }} labelPosition='right corner'
                    fluid disabled /> : null}
        </div>
        )
    }

    render() {
        let { searchResponse, accountPrice } = this.props

        console.log("state");
        console.log(this.state)

        return (
        <div>
            <Button 
                positive 
                fluid 
                size='big' 
                icon='checkmark' 
                labelPosition='right' 
                onClick={this.open}
                content={`Get Name: $${accountPrice} USD`}
            />
            <Modal closeIcon size='tiny' dimmer='blurring' open={this.state.open} onClose={this.close}>
                <Modal.Content>

                    <h1><Icon name='user circle' /> {searchResponse.account}</h1>
                    <p>Let's get your name registered on the EOS network.</p>
                    <Divider />
                    {this.renderKeyInputs(true)}
                    <div className="spacer" />
                    {this.state.showActivePair ? this.renderKeyInputs(false) : 
                    <Button size='mini' onClick={this.showActive}>+ add active public key (optional)</Button>}

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