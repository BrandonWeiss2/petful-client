import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import AdoptionPage from '../routes/adoption-page/adoption-page'
import LandingPage from '../routes/landing-page/landing-page'

export default class Root extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path='/'
          component={LandingPage}
        />
        <Route
          exact
          path='/adoption'
          component={AdoptionPage}
        />
      </Switch>
    )
  }
}