import { Button, Card, Col, Row, Typography, Image } from 'antd'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Product } from '../../store/models/product'
import { API } from '../../config'
import { addItem } from '../../helpers/cart'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'

const { Title, Paragraph } = Typography

interface Props {
  product: Product
  showViewProduct?: Boolean
  showCartBtn?: boolean
} 

const ProductItem: FC<Props> = ({ 
  product, 
  showViewProduct = true, 
  showCartBtn = true
}) => {
   const dispatch = useDispatch()

  const addToCart = () => {
    addItem(product, () => {
      // 跳转页面
      dispatch(push('/cart'))
    })
  }

  const showButtons = () => {
    let buttonArray = []
    if (showViewProduct)
      buttonArray.push(
        <Button type="link">
          <Link to={`/product/${product._id}`}>查看详情</Link>
        </Button>
      )
    if (showCartBtn) {
      buttonArray.push(
        <Button type="link" onClick={addToCart}>
          加入购物车
        </Button>
      )
    }
    return buttonArray
  }

  return (
    <div>
      <Card
        cover={<Image
          src={`${API}/product/photo/${product._id}`}
          alt={product.name}
        />}
        actions={showButtons()}
      >
        <Title level={5}>{product.name}</Title>
        <Paragraph ellipsis={{rows: 2}}>{product.description}</Paragraph>
        <Row>
          <Col span='12'>销量: {product.sold}</Col>
          <Col span='12' style={{textAlign: 'right'}}>价格: {product.price}</Col>
        </Row>
        <Row>
          <Col span='12'>上架时间: {moment(product.createdAt).format("YYYY-MM-DD")}</Col>
          <Col span='12' style={{textAlign: 'right'}}>所属分类: {product.category.name}</Col>
        </Row>
      </Card>
    </div>
  )
}

export default ProductItem