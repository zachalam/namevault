import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../pages/Home'


// The Routes component renders one of the routes
const Routes = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>

    </Switch>
  </main>
)

export default Routes