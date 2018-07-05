import React, { Component } from 'react'
import Routes from './Routes'
import logo from '../../images/logo.png'
import 'semantic-ui-css/semantic.min.css';
import '../../index.css';


class App extends Component {

  componentDidMount() {
    // save price 
  }

  render() {
    return (
    <div>
            <Routes />
    </div>
    );
  }
}

export default App;