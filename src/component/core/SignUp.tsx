import { Button, Form, Input, Result } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { resetSignup, signup, SignupPayLoad } from '../../store/actions/auth.action'
import { AppState } from '../../store/reducers'
import { AuthState } from '../../store/reducers/auth.reducer'
import Layout  from './Layout'

const SignUp = () => {
  const dispatch = useDispatch()
  // 获取注册结果
  const auth = useSelector<AppState, AuthState>(state => state.auth) 
  const onFinish = (value: SignupPayLoad) => {
    dispatch(signup(value))
  }
  // 获取表单操作实例对象
  const [form] = Form.useForm()
  // 1. 注册成功 清空表单
  useEffect(() => {
    if(auth.signup.loaded && auth.signup.success) {
      form.resetFields()
    }
  }, [auth])
  
  // 2. 注册成功 显示成功的提示信息
  const showSuccess = () => {
    if(auth.signup.loaded && auth.signup.success) {
      return <Result
        status="success"
        title="注册成功"
        extra={[<Button type="primary"><Link to='/signin'>登录</Link></Button>]}
      />
    }
  }
  // 3. 注册失败 显示失败的提示信息
  const showFail = () => {
    if(auth.signup.loaded && !auth.signup.success) {
      return <Result
        status="warning"
        title="注册失败"
        subTitle={auth.signup.message}
      />
    }
  }
  // 4. 离开页面之前 重置状态
  useEffect(() => {
    return () => {
      dispatch(resetSignup())
    }
  }, [])

  const signupForm = () => {
    return (
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="name" label="昵称">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="密码">
          <Input.Password />
        </Form.Item>
        <Form.Item name="email" label="邮箱">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>注册</Button>
        </Form.Item>
      </Form>
    )
  }

  return (
    <Layout title='注册' subTitle="还没有账号？ 注册一个吧">
      {showSuccess()}
      {showFail()}
      {signupForm()}
    </Layout>
  )
}

export default SignUp