import React from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Navbar = ({ onSearchChanged }) => {

    return <nav className='d-flex flex-column p-3'>
        <h1 className='h3'>MarcaBR e-commerce</h1>
        <div className='w-50 align-self-center'>
            <Form.Group as={Row}>
                <Form.Label column sm={2}>Pesquisar produto:</Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" placeholder="Redragon" onChange={(e) => onSearchChanged(e.target.value.toLowerCase())} />
                </Col>
            </Form.Group>
        </div>
    </nav>


}

export default Navbar;
