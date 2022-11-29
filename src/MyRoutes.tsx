import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Home from './component/core/Home'
import Shop from './component/core/Shop'

const MyRoutes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/shop' component={Shop} />
      </Switch>
    </HashRouter>
  )
}

export default MyRoutes
