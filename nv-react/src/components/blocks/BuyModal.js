import React, { Component } from 'react'
import { Button, Input, Icon, Modal, Divider } from 'semantic-ui-react'
import ecc from 'eosjs-ecc'
import PayButton from './PayButton'

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
    onKeyChange = (e,genType) => {
        // capture typing of public key.
        console.log("e");
        console.log(e.target.value);
        this.setState({[`${genType}Private`]: '', [`${genType}Public`]: e.target.value})
    }

    genKeyPair = (genType='owner') => {
        // generates a public private key pair.
        // set loading.
        this.setState({[`${genType}Loading`]:true})
        
        ecc.randomKey().then(privateKey => {
            let publicKey = ecc.privateToPublic(privateKey)
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
            <Input 
                placeholder='EOS8mUGcoTi12WMLtTfYFGBSFCtHUSVq15h3XUoMhiAXyRPtTgZjb' 
                onChange={(e) => this.onKeyChange(e,genType)} 
                value={pubKey} 
                fluid 
                error={Boolean(pubKey.length) && !ecc.isValidPublic(pubKey) }   // highlight if not empty and invalid
            />
            {privKey ? 
                <Input 
                    value={privKey} 
                    size='mini' 
                    label={{ icon: 'key', color: 'green' }} 
                    labelPosition='right corner'
                    fluid 
                    disabled 
                /> : null}
        </div>
        )
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
                content={`Get Name: $${accountPrice} USD`}
            />
            <Modal closeIcon size='tiny' dimmer='blurring' open={this.state.open} onClose={this.close}>
                <Modal.Content>

                    <h1><Icon name='user circle' /> {searchResponse.account}</h1>
                    <p>
                        Let's get your name registered on the EOS network. 
                        Make sure your private key <Icon name='key' /> is saved before continuing.
                    </p>
                    <Divider />
                    {this.renderKeyInputs(true)}
                    <br />
                    {this.state.showActivePair ? this.renderKeyInputs(false) : 
                    <Button size='mini' onClick={this.showActive}>+ add active public key (optional)</Button>}

                </Modal.Content>
                <Modal.Actions>
                    <PayButton 
                        accountPrice={accountPrice}
                        ownerPublic={this.state.ownerPublic}
                        activePublic={this.state.activePublic}
                        name={searchResponse.account}
                    />
                </Modal.Actions>
            </Modal>
        </div>
        )
    }

     
}


export default BuyModal