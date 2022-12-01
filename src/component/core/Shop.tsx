import { Button, Col, Row, Space, Empty } from 'antd'
import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import Checkbox from './Checkbox'
import RadioBox from './Radiobox'
import { useDispatch, useSelector } from 'react-redux'
import { filterProduct } from '../../store/actions/product.action'
import { AppState } from '../../store/reducers'
import { ProductState } from '../../store/reducers/product.reducer'
import ProductItem from './ProductItem'

const Shop = () => {
  const [myFilters, setMyFilter] = useState<{
    category: string[]
    price: number[]
  }>({ category: [], price: [] })

  const [skip, setSkip] = useState<number>(0)
  const dispatch = useDispatch()
  const { filter } = useSelector<AppState, ProductState>(state => state.product) 
  
  useEffect(() => {
    setSkip(0)
  }, [myFilters])

  useEffect(() => {
    dispatch(filterProduct({filters: myFilters, skip}))
  }, [myFilters, skip])

  const filterDOM = () => (
    <Space size="middle" direction="vertical">
      <Checkbox
        handleFilter={(filters: string[]) => {
          setMyFilter({ ...myFilters, category: filters })
        }}
      />
      <RadioBox
        handleFilter={(filters: number[]) => {
          setMyFilter({ ...myFilters, price: filters })
        }}
      />
    </Space>
  )

  const productDOM = () => (
    <Row gutter={[16, 16]}>
      {filter.result.data.map(item => (
        <Col key={item._id} span="6">
          <ProductItem product={item} />
        </Col>
      ))}
    </Row>
  )

  const loadMore = () => {
    setSkip(skip + 4)
  }

  const loaderMoreButton = () => {
    return (
      <Row>
        {filter.result.size >= 4 && (
          <Button onClick={loadMore}>加载更多</Button>
        )}
      </Row>
    )
  }

  const noData = () => {
    return <Row>{filter.result.size === 0 && <Empty />}</Row>
  }

  return (
    <Layout title='糯客商场' subTitle="挑选你选的商品吧">
      <Row>
        <Col span="4">
          { filterDOM() }
        </Col>
        <Col span="20">
          { productDOM() }
          { loaderMoreButton() }
          { noData() }
        </Col>
      </Row>
    </Layout>
  )
}

export default Shop
