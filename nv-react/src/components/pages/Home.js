import React, { Component } from 'react'
import { Input, Card } from 'semantic-ui-react'
import logo from '../../images/logo.png'
import FadeIn from 'react-fade-in'

class Home extends Component {

    state = {
        searchTerm: '',
        searchLoading: false
    }
    
    onSearchChange = (e) => {
        // only allow alphanumeric chars.
        let letters = /^[0-9a-zA-Z]+$/;
        let { value } = e.target;

        if(value.match(letters) || value === '') {
            // save search term so far.
            this.setState({searchTerm: value})
        }

        if(value.length===12) {
            // trigger search run.
            this.setState({searchLoading: true})
        }
    }


    render() {
        return (
            <div style={{textAlign: 'center', maxWidth: 500}}>
                <img src={logo} />
                <FadeIn delay={800}>

                <Card fluid color='blue'>
                    <Card.Content>
                        <Card.Description>

                            <Input 
                                size='massive' 
                                icon='search' 
                                placeholder='Find your EOS name...' 
                                onChange={this.onSearchChange}
                                maxLength={12}
                                style={{backgroundColor: 'transparent', marginBottom: '0.25em'}}
                                value={this.state.searchTerm}
                                loading={this.state.searchLoading}
                            />
                            <br />
                            <span>{this.state.searchTerm.length} characters so far, 12 required.</span>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </FadeIn>
            <br /><br />
            100% Open Source
            </div>
        );
    }
}


export default Home