import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import './Filters.css';

const filterConditions = {
    sale: product => product.originalPrice !== product.price,
    freeShipping: product => product.freeShipping,
    minPrice: (product, value) => product.price >= Number(value),
    maxPrice: (product, value) => product.price <= Number(value),
    brands: (product, items) => items.includes(product.brand),
    conditions: (product, items) => items.includes(product.condition),
    categories: (product, items) => items.includes(product.category),
}

const Filters = ({products, onProductsFiltered }) => {
    const [brands, setBrands] = useState([]);
    const [conditions, setConditions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        sale: undefined,
        freeShipping: undefined,
        brands: [],
        conditions: [],
        categories: [],
        minPrice: undefined,
        maxPrice: undefined
    });

    useEffect(() => {
        const [brandOptions,
               conditionOptions,
               categoryOptions] = getFilterOptions(products);

        setBrands(brandOptions)
        setConditions(conditionOptions)
        setCategories(categoryOptions)
    }, [products])

    useEffect(() => {
        // when form changes...
        onProductsFiltered(filterProducts(products, form))
    }, [form])

    function filterChange(filterName, value, label) {
        switch (filterName) {
            case 'sale':
            case 'freeShipping':
            case 'minPrice':
            case 'maxPrice':
                setForm({...form, [filterName]: value });
                break;

            case 'brands':
            case 'conditions':
            case 'categories':
                if (value) {
                    // add label into array of the selectd filter
                    setForm({...form, [filterName]: [...form[filterName], label] })
                } else {
                    // remove label from array of the selected filter
                    setForm({...form, [filterName]: form[filterName].filter(f => f !== label) })
                }
                break;
            default:
                break;
        }
    }

    return (<Form className="p-3 d-flex flex-column gap-2" >

        <Card>
            <Card.Body>
                <Form.Check
                    reverse
                    className="form-check-justified"
                    type="checkbox"
                    label='Promoções'
                    onChange={e => filterChange('sale', e.target.checked)}
                />
            </Card.Body>
        </Card>

        <Card>
            <Card.Body>
                <Form.Check
                    reverse
                    className="form-check-justified"
                    type="checkbox"
                    label='Entrega grátis'
                    onChange={e => filterChange('freeShipping', e.target.checked)}
                />
            </Card.Body>
        </Card>

        <div>
            <h5>Marcas</h5>
            {Array.from(brands).map((item) =>
                <Form.Check
                    type="checkbox"
                    key={item}
                    label={item}
                    onChange={e => filterChange('brands', e.target.checked, item)}
                />
            )}
        </div>

        <div>
            <h5>Condição</h5>
            {Array.from(conditions).map((item) =>
                <Form.Check
                    type="checkbox"
                    key={item}
                    label={item}
                    onChange={e => filterChange('conditions', e.target.checked, item)}
                />
            )}
        </div>

        <div>
            <h5>Categorias</h5>
            {Array.from(categories).map((item) =>
                <Form.Check
                    type="checkbox"
                    key={item}
                    label={item}
                    onChange={e => filterChange('categories', e.target.checked, item)}
                />
            )}
        </div>

        <div>
            <h5>Preços</h5>
            <Row>
                <Col xs="5">
                    <Form.Control type="number" placeholder="0" onChange={e => filterChange('minPrice', e.target.valueAsNumber)} />
                </Col>
                <Col xs="1"><span>à</span></Col>
                <Col xs="5">
                    <Form.Control type="number" placeholder="600" onChange={e => filterChange('maxPrice', e.target.valueAsNumber)} />
                </Col>
            </Row>
        </div>
    </Form>)
}

function getFilterOptions(products) {
    const brands = new Set();
    const conditions = new Set();
    const categories = new Set();

    for (const product of products) {
        brands.add(product.brand);
        conditions.add(product.condition);
        categories.add(product.category)
    }

    return [brands, conditions, categories];
}

function filterProducts(products, form) {
    let productsFiltered = products;
    for (const [key, value] of Object.entries(form)) {
        if (!value || (Array.isArray(value) && value.length === 0)) {
            continue;
        }

        productsFiltered = productsFiltered.filter((p) => filterConditions[key](p, value))
    }

    return productsFiltered;
}
export default Filters;
