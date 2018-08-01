import React, { Component } from 'react'
import Home from '../pages/Home'
import { Grid, Segment, Icon } from 'semantic-ui-react'
import logo from '../../images/logo_white.png'

import 'semantic-ui-css/semantic.min.css';
import '../../index.css';


class App extends Component {

  render() {
    return (

    <div className='searchArea'>
      <Grid
        textAlign='center'
        style={{ height: '100%' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{maxWidth: 400}}>
          <img src={logo} alt="NameVault Logo" style={{maxWidth:"75%"}} />
            <Segment raised={true} style={{padding:'2em'}}>
              <Home />
            </Segment>
          <div>
            <br />
            <a href="https://github.com/zachalam/namevault.co" className="footerLink" target="_blank" rel="noopener noreferrer"><Icon name="github" />GitHub</a>
            &nbsp; | &nbsp; 
            <a href="https://medium.com/@alamzach/namevault-co-create-an-eos-account-easily-in-under-60-seconds-a6f753fe211c" className="footerLink" target="_blank" rel="noopener noreferrer"><Icon name="medium" />Medium</a>
            &nbsp; | &nbsp; 
            <a href="https://www.reddit.com/r/eos/comments/8zwcti/cant_think_of_an_eos_account_name_try_my_eos_name/" className="footerLink" target="_blank" rel="noopener noreferrer"><Icon name="reddit alien" />Reddit</a>    
          </div>
        </Grid.Column>
      </Grid>

      <div className='fixedFooter'>Need help? Watch the <a href="https://www.youtube.com/watch?v=dgKB6qwLTfk" target="_blank" rel="noopener noreferrer">2 minute video</a>!</div>
    </div>
    );
  }
}

export default App;