import React, { Component } from 'react'
import { Input, Button, Icon, Card } from 'semantic-ui-react'
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
        let letters = /^[1-5a-zA-Z]+$/;
        let { value } = e.target;

        if(value.match(letters) || value === '') {
            // save search term so far.
            this.setState({searchTerm: value})

            // if the value suplied is the correct length, run search.
            if(value.length===12) {
                // trigger search run.
                this.setState({searchLoading: true, searchResponse: {}})
                this.runSearch(value)
            } 
        }
    }

    showSuccessModal = () => {
        // final step of checkout.
        // resets search input & search term.
        // shows successmodal.
        this.setState({searchResponse: {},searchTerm: '',successModalOpen:true})
    }

    onGenRandomWord = () => {
        this.setState({searchLoading:true})
        fetch(`${MasterConfig.httpEndpoint}/word`)
        .then((response) => {
          return response.json()
        })
        .then((wordResponse) => {
            // turn off nameloading
            this.setState({searchLoading:false})
            // run search with a random word.
            this.onSearchChange({target: {value: wordResponse.word}})
        });
    }

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <FadeIn transitionDuration={800}>

                    <ResultCard 
                        accountPrice={this.state.accountPrice}
                        searchResponse={this.state.searchResponse}
                        showSuccessModal={this.showSuccessModal} 
                    />
                    <br />

                    <Input 
                        size='huge' 
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
                    <span>
                        {this.state.searchTerm.length}/12 characters.
                        &nbsp; &nbsp;
                        <Button animated size='mini' color='blue' onClick={this.onGenRandomWord}>
                        <Button.Content visible>Random Name</Button.Content>
                        <Button.Content hidden>
                            Generate
                        </Button.Content>
                        </Button>

                    </span>
                    <div className="spacer" />

                </FadeIn>

                <SuccessModal open={this.state.successModalOpen} />
            </div>
        );
    }
}


export default Home