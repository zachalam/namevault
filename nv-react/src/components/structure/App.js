import React, { Component } from 'react'
import Home from '../pages/Home'
import { Grid, Segment, Icon } from 'semantic-ui-react'
import logo from '../../images/logo.png'

import 'semantic-ui-css/semantic.min.css';
import '../../index.css';


class App extends Component {

  render() {
    return (

    <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{maxWidth: 400}}>
        <img src={logo} className="App-logo" alt="NameVault Logo" style={{width:"100%"}} />
          <Segment stacked={true} style={{padding:'2em'}}>
            <Home />
          </Segment>
        <div>
          <br />
          <a href="https://github.com/zachalam/namevault.co" target="_blank" rel="noopener noreferrer"><Icon name="github" />GitHub</a>
          &nbsp; | &nbsp; 
          <a href="https://github.com/zachalam/namevault.co" target="_blank" rel="noopener noreferrer"><Icon name="medium" />Medium</a>
          &nbsp; | &nbsp; 
          <a href="https://github.com/zachalam/namevault.co" target="_blank" rel="noopener noreferrer"><Icon name="reddit alien" />Reddit</a>    
        </div>
      </Grid.Column>
    </Grid>
    );
  }
}

export default App;