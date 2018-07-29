import React, { Component } from 'react'
import { Input, Icon, Label } from 'semantic-ui-react'
import FadeIn from 'react-fade-in'
import MasterConfig from '../../config/Master'
import ResultCard from '../blocks/ResultCard'
import SuccessModal from '../blocks/SuccessModal'
import RandomWordButton from '../blocks/RandomWordButton'

class Home extends Component {

    state = {
        searchTerm: '',
        searchTermFinish: '',
        searchLoading: false,
        searchResponse: {},
        accountPrice: '',
        successModalOpen: false,
        inputError: false,
        showLandingTitle: true  // show "got your EOS account on page load"
    }

    componentDidMount() {
        // get pricing.
        fetch(`${MasterConfig.httpEndpoint}/price`)
        .then(response => response.json())
        .then((pricing) => {
          this.setState({accountPrice: pricing.price})
        });   
        // run search automatically if present in url hash.
        let hashName = window.location.hash.replace("#","")
        if(hashName.length <= MasterConfig.requiredChars) this.onSearchChange({target: {value: hashName}})   
    }
    
    runSearch = (name) => {
        // hide landing page title
        if(this.state.showLandingTitle) this.setState({showLandingTitle: false})
        // run search
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
        let letters = /^[1-5a-z]+$/;
        let { value } = e.target;

        if(value.match(letters) || value === '') {
            // save search term so far.
            this.setState({searchTerm: value, inputError: false})

            // if the value suplied is the correct length, run search.
            if(value.length===MasterConfig.requiredChars) {
                // trigger search run.
                this.setState({searchLoading: true, searchResponse: {}})
                this.runSearch(value)
            } 
        } else {
            // illegal char entered.
            this.setState({inputError: true})
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
        fetch(`${MasterConfig.httpEndpoint}/word/${this.state.searchTermFinish}`)
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

    onFinishRandomWord = () => {
        let { searchTerm, searchTermFinish } = this.state
        if(!searchTermFinish.length)
            // copy search term so far, then run random word generator
            this.setState({searchTermFinish: searchTerm},this.onGenRandomWord)
        else
            // just run finish word generator (with already saved word)
            this.onGenRandomWord()
    }

    shouldShowFinishButton = () => {
        // the finish random button is showed IF, 
        // we already finishing random words - OR - the search term exists and isn't the maximum length.
        let { searchTerm, searchTermFinish } = this.state
        return Boolean(
            searchTermFinish.length ||
            (searchTerm.length > 0 && searchTerm.length < MasterConfig.requiredChars)
        )
    }

    clearSearchTermFinish = () => {
        // resets the finish random word.
        this.setState({searchTermFinish: ''})
    }

    render() {
        return (
            <div style={{textAlign: 'center', paddingTop: '0.25em'}}>
                {this.state.showLandingTitle ? <h3><Icon name='user' /> GET YOUR EOS ACCOUNT</h3> : null }

                <ResultCard 
                    accountPrice={this.state.accountPrice}
                    searchResponse={this.state.searchResponse}
                    showSuccessModal={this.showSuccessModal} 
                />
                <br />

                <FadeIn transitionDuration={800}>
                    {this.state.inputError ? 
                        <FadeIn>
                            <Label color='red'>
                                Lowercase letters (a-z) and numbers (1-5) only.
                            </Label>
                            <br />
                        </FadeIn> 
                    : null }

                    <Input 
                        size='huge' 
                        icon='search' 
                        placeholder='Find your EOS name...' 
                        onChange={this.onSearchChange}
                        maxLength={MasterConfig.requiredChars}
                        style={{backgroundColor: 'transparent', marginBottom: '0.25em'}}
                        value={this.state.searchTerm}
                        loading={this.state.searchLoading}
                        disabled={this.state.searchLoading}
                        error={this.state.searchResponse.success}
                        autoFocus={true}
                        autoComplete="off" 
                        autoCorrect="off" 
                        autoCapitalize="off" 
                        spellCheck="false"
                    />
                    
                    <br />
                    <span>
                        {this.state.searchTerm.length}/{MasterConfig.requiredChars} characters.
                        &nbsp; &nbsp;
                        <RandomWordButton
                            onGenRandomWord={this.onGenRandomWord}
                            onFinishRandomWord={this.onFinishRandomWord}
                            showFinish={this.shouldShowFinishButton()}
                            searchTermFinish={this.state.searchTermFinish}
                            reset={this.clearSearchTermFinish}
                        />
                    </span>
                </FadeIn>
    
                <div className="spacer" />
                <SuccessModal open={this.state.successModalOpen} />
            </div>
        );
    }
}

export default Home