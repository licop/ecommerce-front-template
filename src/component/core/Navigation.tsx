import React, { useContext, useEffect } from 'react'
import { Menu, Badge } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppState } from '../../store/reducers'
import { RouterState } from 'connected-react-router'
import { TotalContext } from "../../CountContext"
import { isAuth } from '../../helpers/auth'
import { Jwt } from '../../store/models/auth'
import { itemCount } from '../../helpers/cart'

function useActive(currentPath: string, path: string): string {
  return currentPath === path ? "ant-menu-item-selected" : ''
}

const Navigation = () => {
  const router = useSelector<AppState, RouterState>(state => state.router)
  const pathName = router.location.pathname
  const isHome = useActive(pathName, '/')
  const isShop = useActive(pathName, '/shop')
  const isCart = useActive(pathName, '/cart')

  const isSignin = useActive(pathName, '/signin')
  const isSignup = useActive(pathName, '/signup')
  const isDashboard = useActive(pathName, getDashboardUrl())
  
  const [count, setCount] = useContext(TotalContext)

  useEffect(() => {
    setCount(itemCount()) 
  })

  function getDashboardUrl() {
    let url = '/user/dashboard'
    if(isAuth()) {
      const {user: {role }} = isAuth() as Jwt
      if(role === 1) {
        url = '/admin/dashboard'
      }
    }
    return url
  }

  return (
    <Menu mode='horizontal' selectable={false}>
      <Menu.Item className={isHome}>
        <Link to="/">首页</Link>
      </Menu.Item>
      <Menu.Item className={isShop}>
        <Link to="/shop">商场</Link>
      </Menu.Item>
      <Menu.Item className={isCart}>
        <Link to="/cart">
          购物车 
          <Badge count={count} offset={[5, -10]} />
        </Link>
      </Menu.Item>
      {
        !isAuth() && (
          <>
            <Menu.Item className={isSignin}>
              <Link to="/signin">登录</Link>
            </Menu.Item>
            <Menu.Item className={isSignup}>
              <Link to="/signup">注册</Link>
            </Menu.Item>
          </>
        )
      }
      {
        isAuth() && (
          <Menu.Item className={isDashboard}>
            <Link to={getDashboardUrl()} >Dashboard</Link>
          </Menu.Item>
        )
      }
    </Menu>
  )
}

export default Navigation
