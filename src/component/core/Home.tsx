import React from 'react'
import { useSelector } from 'react-redux'
import Layout from './Layout'

const Home = () => {
  const state = useSelector(state => state)
  console.log(state, 8)
  return (
    <div>Home</div>
  )
}

export default Home