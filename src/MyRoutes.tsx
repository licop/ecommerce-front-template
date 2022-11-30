import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Home from './component/core/Home'
import Shop from './component/core/Shop'
import SignIn from './component/core/SignIn'
import SignUp from './component/core/SignUp'

const MyRoutes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/shop' component={Shop} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
      </Switch>
    </HashRouter>
  )
}

export default MyRoutes
