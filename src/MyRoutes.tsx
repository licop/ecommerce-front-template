import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Home from './component/core/Home'
import Shop from './component/core/Shop'
import SignIn from './component/core/SignIn'
import SignUp from './component/core/SignUp'
import Dashboard from './component/admin/Dashboard'
import AdminDashboard from './component/admin/AdminDashboard'
import PrivateRoute from './component/admin/PrivateRoute'
import AdminRoute from './component/admin/AdminRoute'
import AddCategory from './component/admin/AddCategory'
import AddProduct from './component/admin/AddProduct'

const MyRoutes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/shop' component={Shop} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <PrivateRoute path='/user/dashboard' component={Dashboard} />
        <AdminRoute path='/admin/dashboard' component={AdminDashboard} />
        <AdminRoute path='/create/category' component={AddCategory} />
        <AdminRoute path='/create/product' component={AddProduct} />
      </Switch>
    </HashRouter>
  )
}

export default MyRoutes
