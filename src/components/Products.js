import React from 'react'
import './Products.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import TruckSvg from '../truck.svg'

const ProductPrice = ({product}) => {
    return <div className='text-start'>
        <div>
            {product.originalPrice !== product.price &&
                <s><small className='text-secondary'>R${product.originalPrice}</small></s>}
            {product.discountPercentage !== 0 &&
                <span className='text-success small'> {product.discountPercentage}%</span>}
        </div>

        <div>
            <b className='text-success'>R${product.price}</b>
        </div>

        {product.freeShipping && <div>
            <span className='text-success small'>Entrega grátis </span>
            <img className="free-shipping text-success" src={TruckSvg} alt="truck" />
        </div>}
    </div>
}

const Products = ({ products }) => {
    return <div className='products m-3'>
       {products.map((product, i) => <Card key={i}>
            <Card.Img variant="top" src={product.imageSrc} className="align-self-center"/>
            <Card.Body>
                <Card.Title className="text-truncate" title={product.name}>{product.name}</Card.Title>
                <Card.Subtitle>
                    <ProductPrice product={product} />
                </Card.Subtitle>
                <Card.Text className="text-start text-truncate" title={product.description}>{product.description}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button variant="primary" className="add-cart w-100">Adicionar ao carrinho</Button>
            </Card.Footer>
       </Card>)}
    </div>
}



export default Products
