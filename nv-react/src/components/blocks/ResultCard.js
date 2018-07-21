import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import FadeIn from 'react-fade-in'
import BuyModal from './BuyModal'

class ResultCard extends Component {

    render() {

        let { searchResponse, accountPrice } = this.props
        let nameAvailable = !searchResponse.success

        // no result available.
        if(Object.keys(searchResponse).length === 0) return null

        // card that displays the result of a name search
        if (nameAvailable)
            return ( 
                <FadeIn>
                    <h1><Icon name='smile' />Available!</h1>
                    <div className='spacer' />
                    <div>Get <u>{searchResponse.account}</u> before someone else.</div>
                    <div className='spacer' />
                    <BuyModal 
                        searchResponse={searchResponse}
                        accountPrice={accountPrice}
                        showSuccessModal={this.props.showSuccessModal} 
                    />
                    <div className='spacer' />
                    Includes 4kb of RAM and 0.02 EOS.       
                </FadeIn>
            )

        // name is not available.
        return ( 
            <FadeIn>
                <h1><Icon name='frown' />Unavailable.</h1>
                <div className='spacer' />
                <div>Darn, someone already has <u>{searchResponse.account}</u>.</div>
            </FadeIn>
        )    
    }
}


export default ResultCard