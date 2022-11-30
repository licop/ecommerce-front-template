import Layout from '../core/Layout'
import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import axios from 'axios'
import { API } from '../../config'
import { Jwt } from '../../store/models/auth'
import { isAuth } from '../../helpers/auth'
import { Link } from 'react-router-dom'

const AddCategory = () => {
  const [name, setName] = useState<string>('')
  const [messageApi, contextHolder] = message.useMessage();

  const {
    user, token
  } = isAuth() as Jwt
  
  useEffect(() => {
    async function addCategory() {
      try {
        let response = await axios.post<{name: string}>(`${API}/category/create/${user._id}`, {
          name: name
        }, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        messageApi.open({
          type: 'success',
          content: `[${response.data.name}] 分类添加成功`,
          duration: 3
        });
      } catch (error: any) {
        messageApi.open({
          type: 'error',
          content: error.response.data.error,
          duration: 3,
        });
      }
    }
    if(name) {
      addCategory()
    }
  }, [name])

  const onFinish = (value: {name: string}) => {
    setName(value.name)
  }
  
  return (
    <Layout title='添加分类' subTitle="">
      {contextHolder}
      <Form onFinish={onFinish}>
        <Form.Item name='name' label='分类名称'>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>添加分类</Button>
        </Form.Item>
      </Form>
      <Button>
        <Link to="/admin/dashboard">返回 Dashboard</Link>
      </Button>
    </Layout>
  )
}

export default AddCategory
