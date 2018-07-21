import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'


class RandomWordButton extends Component {

    render() {

        let {onGenRandomWord, onFinishRandomWord, showFinish, searchTermFinish, reset } = this.props

        // show the finish random button
        if(showFinish)
            return (
                <span>
                    <Button size='mini' color='orange' onClick={onFinishRandomWord}>
                    {!searchTermFinish.length ? 'Finish Name' : searchTermFinish }
                    </Button>
                    {!searchTermFinish.length ? null :
                        <Button size='mini' icon='cancel' onClick={reset} />}
                </span>
            )

        // show generic random button
        return (
            <Button animated size='mini' color='blue' onClick={onGenRandomWord}>
            <Button.Content visible>Random Name</Button.Content>
            <Button.Content hidden>
                Generate
            </Button.Content>
            </Button>
        )
    }
}

export default RandomWordButton