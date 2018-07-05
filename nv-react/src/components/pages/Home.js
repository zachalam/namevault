import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import logo from '../../images/logo.png'

class Home extends Component {

    state = {
        searchTerm: ''
    }
    
    onSearchChange = (e) => {
        // only allow alphanumeric chars.
        var letters = /^[0-9a-zA-Z]+$/;
        if(e.target.value.match(letters) || e.target.value === '') {
            this.setState({searchTerm: e.target.value})
        }
    }


    render() {
        return (
            <div style={{textAlign: 'center', maxWidth: 500}}>
                <img src={logo} />
                <Input 
                    size='massive' 
                    icon='search' 
                    placeholder='Find your EOS name...' 
                    onChange={this.onSearchChange}
                    maxLength={12}
                    style={{backgroundColor: 'transparent'}}
                    value={this.state.searchTerm}
                />
            </div>
        );
    }
}


export default Home