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
import Product from './component/core/Product'
import Cart from './component/core/Cart'
import PaySuccess from './component/core/PaySuccess'
import Orders from './component/admin/Orders'

const MyRoutes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/shop' component={Shop} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path="/cart" component={Cart} />
        <Route path="/paysuccess" component={PaySuccess} />
        <PrivateRoute path='/user/dashboard' component={Dashboard} />
        <AdminRoute path='/admin/dashboard' component={AdminDashboard} />
        <AdminRoute path='/create/category' component={AddCategory} />
        <AdminRoute path='/create/product' component={AddProduct} />
        <AdminRoute path='/admin/orders' component={Orders} />
        <Route path='/product/:productId' component={Product} />
      </Switch>
    </HashRouter>
  )
}

export default MyRoutes
