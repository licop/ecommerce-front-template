import React, { FC } from 'react'
import {Redirect, Route, RouteProps} from 'react-router-dom'
import { isAuth } from '../../helpers/auth'

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>
}
// 受保护的路由，只有登录时才显示组件
const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,  
  ...rest
}) => {
  return (
    <Route {...rest} render={props => {
      const auth = isAuth()
      if(auth) {
        return <Component {...props} />
      }
      return <Redirect to='/signin' />
    }} />
  )
}

export default PrivateRoute