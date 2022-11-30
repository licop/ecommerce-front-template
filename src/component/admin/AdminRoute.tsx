import React, { FC } from 'react'
import {Redirect, Route, RouteProps} from 'react-router-dom'
import { isAuth } from '../../helpers/auth'
import { Jwt } from '../../store/models/auth'

interface AdminRouteProps extends RouteProps {
  component: React.ComponentType<any>
}
// 受保护的路由，只有登录时才显示组件
const AdminRoute: FC<AdminRouteProps> = ({
  component: Component,  
  ...rest
}) => {
  return (
    <Route {...rest} render={props => {
      const auth = isAuth()
      if(auth) {
        const {user: { role }} = isAuth() as Jwt
        if(role === 1) return <Component {...props} />
        
      }
      return <Redirect to='/signin' />
    }} />
  )
}

export default AdminRoute
