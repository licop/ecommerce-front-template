import React from 'react'
import { useSelector } from 'react-redux'
import Layout from './Layout'

const Home = () => {
  const state = useSelector(state => state)
  console.log(state, 8)
  return (
    <Layout title='糯客商场' subTitle="尽情享受吧">Home</Layout>
  )
}

export default Home