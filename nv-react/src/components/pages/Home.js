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
        searchResponse: {},
        accountPrice: ''
    }

    componentDidMount() {
        // get pricing.
        fetch(`${MasterConfig.httpEndpoint}/price`)
        .then(response => response.json())
        .then((pricing) => {
          this.setState({accountPrice: pricing.price})
        });      
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

                            <ResultCard 
                                accountPrice={this.state.accountPrice}
                                searchResponse={this.state.searchResponse} 
                            />
                            <br />

                            <Input 
                                size='massive' 
                                icon='search' 
                                placeholder='Find your EOS name...' 
                                onChange={this.onSearchChange}
                                maxLength={12}
                                style={{backgroundColor: 'transparent', marginBottom: '0.25em'}}
                                value={this.state.searchTerm}
                                loading={this.state.searchLoading}
                                disabled={this.state.searchLoading}
                                autofocus={true}
                            />
                            <br />
                            <span>{this.state.searchTerm.length} characters so far, 12 required.</span>
                        

                        </Card.Description>
                    </Card.Content>
                </Card>

                

            </FadeIn>
            <br /><br />
            <a href="https://github.com/zachalam/namevault.co" target="_blank"><Icon name="github" />GitHub</a>
             &nbsp; | &nbsp; 
             <a href="https://github.com/zachalam/namevault.co" target="_blank"><Icon name="medium" />Medium</a>
             &nbsp; | &nbsp; 
             <a href="https://github.com/zachalam/namevault.co" target="_blank"><Icon name="reddit alien" />Reddit</a>
            </div>
        );
    }
}


export default Home