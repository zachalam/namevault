import React, { Component } from 'react'
import { Input, Icon, Card } from 'semantic-ui-react'
import logo from '../../images/logo.png'
import FadeIn from 'react-fade-in'
import MasterConfig from '../../config/Master'
import ResultCard from '../blocks/ResultCard'

class Home extends Component {

    state = {
        searchTerm: '',
        searchLoading: false,
        searchResponse: {}
    }
    
    runSearch = (name) => {
        fetch(`${MasterConfig.httpEndpoint}/lookup/${name}`)
        .then((response) => {
          return response.json()
        })
        .then((searchResponse) => {
          this.setState({searchResponse, searchLoading: false})
        });
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
            this.setState({searchLoading: true, searchResponse: {}})
            this.runSearch(value)
        }
    }


    render() {
        return (
            <div style={{textAlign: 'center', maxWidth: 500}}>
                <img src={logo} />
                <FadeIn transitionDuration={800}>

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
                                autofocus={true}
                            />
                            <br />
                            <span>{this.state.searchTerm.length} characters so far, 12 required.</span>
                        
                            <br /><br />
                            <ResultCard searchResponse={this.state.searchResponse} />

                        </Card.Description>
                    </Card.Content>
                </Card>

                

            </FadeIn>
            <br /><br />
            <a href="https://github.com/zachalam/namevault.co" target="_blank"><Icon name="github" />GitHub</a>
             &nbsp; | &nbsp; 
            <Icon name="medium" />Medium &nbsp; | &nbsp; 
            <Icon name="reddit alien" />Reddit
            </div>
        );
    }
}


export default Home