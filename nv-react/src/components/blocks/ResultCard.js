import React, { Component } from 'react'
import { Input, Icon, Card } from 'semantic-ui-react'
import FadeIn from 'react-fade-in'

class ResultCard extends Component {

    render() {

        let { searchResponse } = this.props
        let nameAvailable = !searchResponse.success

        // no result available.
        if(Object.keys(searchResponse).length === 0) return null

        // card that displays the result of a name search
        if (nameAvailable)
            return ( 
                <FadeIn>
                    <Card fluid color='green'>
                    <Card.Content>
                            <Card.Description>
                                <h3>Wow, you found yourself a cool name!</h3>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </FadeIn>
            )

        // name is not available.
        return ( 
            <FadeIn>
                <Card fluid color='red'>
                <Card.Content>
                        <Card.Description>
                            <h3>Look's like that name is not available.</h3>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </FadeIn>
        )    
    }
}


export default ResultCard