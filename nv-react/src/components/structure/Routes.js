import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../pages/Home'
import Random from '../pages/Random'


// The Routes component renders one of the routes
const Routes = () => (
  <main>
    <Switch>
    <Route exact path='/' component={Home}/>
    <Route exact path='/random' component={Random}/>

    </Switch>
  </main>
)

export default Routes