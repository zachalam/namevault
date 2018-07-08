import React, { Component } from 'react'
import { Input, Icon, Card } from 'semantic-ui-react'
import logo from '../../images/logo.png'
import FadeIn from 'react-fade-in'
import MasterConfig from '../../config/Master'
import ResultCard from '../blocks/ResultCard'
import SuccessModal from '../blocks/SuccessModal'

class Home extends Component {

    state = {
        searchTerm: '',
        searchLoading: false,
        searchResponse: {},
        accountPrice: '',
        successModalOpen: false
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

    showSuccessModal = () => {
        // final step of checkout.
        // resets search input & search term.
        // shows successmodal.
        this.setState({searchResponse: {},searchTerm: '',successModalOpen:true})
    }

    render() {
        return (
            <div style={{textAlign: 'center', maxWidth: 500}}>
                <img src={logo} alt={'logo'} />
                <FadeIn transitionDuration={800}>

                <Card fluid color='blue'>
                    <Card.Content>
                        <Card.Description>

                            <ResultCard 
                                accountPrice={this.state.accountPrice}
                                searchResponse={this.state.searchResponse}
                                showSuccessModal={this.showSuccessModal} 
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
                                error={this.state.searchResponse.success}
                                autoFocus={true}
                            />
                            <br />
                            <span>{this.state.searchTerm.length} characters so far, 12 required.</span>
                            <div className="spacer" />

                        </Card.Description>
                    </Card.Content>
                </Card>

            </FadeIn>
            <br /><br />
            <a href="https://github.com/zachalam/namevault.co" target="_blank" rel="noopener noreferrer"><Icon name="github" />GitHub</a>
             &nbsp; | &nbsp; 
             <a href="https://github.com/zachalam/namevault.co" target="_blank" rel="noopener noreferrer"><Icon name="medium" />Medium</a>
             &nbsp; | &nbsp; 
             <a href="https://github.com/zachalam/namevault.co" target="_blank" rel="noopener noreferrer"><Icon name="reddit alien" />Reddit</a>
           
            <SuccessModal open={this.state.successModalOpen} />
            </div>
        );
    }
}


export default Home