import React from 'react'
import Layout  from './Layout'
import { Button, Form, Input, Result } from 'antd'
import { signin, SigninPayLoad } from '../../store/actions/auth.action'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../store/reducers'
import { AuthState } from '../../store/reducers/auth.reducer'
import { isAuth } from '../../helpers/auth'
import { Jwt } from '../../store/models/auth'
import { Redirect } from 'react-router-dom'

const SignIn = () => {
  const dispatch = useDispatch()

  const onFinish = (value: SigninPayLoad) => {
    dispatch(signin(value))
  }
  
  const auth = useSelector<AppState, AuthState>(state => state.auth)

  // 登录失败 显示错误信息
  const showError = () => {
    if(auth.signin.loaded && !auth.signin.success) {
      return <Result
        status="warning"
        title="登录失败"
        subTitle={auth.signin.message}
      />
    }
  }
  // 登录成功 根据角色跳转的对应的管理页面
  const redirectToDashboard = () => {
    const auth = isAuth()
    if(auth) {
      const {
        user: { role }
      } = auth as Jwt

      if(role === 0) {
        return <Redirect to="/user/dashboard" />
        // 注册用户
      } else {
        // 管理员
        return <Redirect to="/admin/dashboard" />  
      }
    }
  }

  // 处理导航链接
  const SignInForm = () => (
    <Form onFinish={onFinish}>
      <Form.Item name="password" label="密码">
        <Input.Password />
      </Form.Item>
      <Form.Item name="email" label="邮箱">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>登录</Button>
      </Form.Item>
    </Form>
  )

  return (
    <Layout title='登录' subTitle="">
      {showError()}
      {redirectToDashboard()}
      {SignInForm()}
    </Layout>
  )
}

export default SignIn
