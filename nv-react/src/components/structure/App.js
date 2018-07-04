import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import Routes from './Routes'
import logo from '../../images/logo.png'
import 'antd/dist/antd.css';
import '../../index.css';

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
    <div>
        <Routes />
    </div>
    );
  }
}

export default App;