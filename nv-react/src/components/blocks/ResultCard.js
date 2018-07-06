import React, { Component } from 'react'
import { Button, Input, Icon, Card } from 'semantic-ui-react'
import FadeIn from 'react-fade-in'

class ResultCard extends Component {

    render() {

        let { searchResponse, accountPrice } = this.props
        let nameAvailable = !searchResponse.success

        console.log("ap", accountPrice);

        // no result available.
        if(Object.keys(searchResponse).length === 0) return null

        // card that displays the result of a name search
        if (nameAvailable)
            return ( 
                <FadeIn>
                    <Card fluid>
                    <Card.Content>
                            <Card.Description>
                                <h1><Icon name='smile' />Available!</h1>
                                Get <i>{searchResponse.account}</i> before someone else does.
                                <div className='spacer' />
                                <Button positive fluid size='big'>Buy Name, ${accountPrice} USD (one time)</Button>
                                <div className='spacer' />
                                Price includes 4kb of RAM and 0.2 EOS.
                            
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </FadeIn>
            )

        // name is not available.
        return ( 
            <FadeIn>
                <Card fluid>
                <Card.Content>
                        <Card.Description>
                            <h1><Icon name='frown' />Unavailable.</h1>
                            Darn, looks like someone already has that name.
                        </Card.Description>
                    </Card.Content>
                </Card>
            </FadeIn>
        )    
    }
}


export default ResultCard