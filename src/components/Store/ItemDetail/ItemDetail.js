import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Storage } from "aws-amplify";
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import * as actionTypes from '../../../redux/actions/actionTypes';
class ItemDetail extends Component {
    state = {
        item: {
        },
        imageURL: '',
        itemQuantity: 1
    }

    fetchData = async (id, index = 1) => {
        const url = "https://aef1nhb6nb.execute-api.ap-southeast-1.amazonaws.com/dev/books/" + id;
        try {
            const response = await axios.get(url);
            let imageURL = await Storage.vault.get(response.data.image);
            this.setState({
                item: response.data,
                imageURL
            })

        } catch (error) {
            if (error.response.status === 502 && index > 1) {
                this.fetchData(index--);
            }
        }

    }

    componentDidMount() {
        this.fetchData(this.props.match.params.id, 2)
    }

    onSelect = (event) => {
        this.setState({
            itemQuantity: parseInt(event.target.value)
        }, () => console.log(this.state.itemQuantity))
    }

    onSubmit = () => {
        this.props.addOrder(this.state.item._id,
            this.state.itemQuantity,
            this.state.item.price,
            this.state.item.title);
        alert('Added to your bage')
        this.props.history.push('/store');
    }



    render() {
        return (
            <Container className="mt-5">
                <h1 style={{fontSize: '60px'}}>{this.state.item.title}</h1>
                <Row>
                    <Col md={6}>
                        <Image src={this.state.imageURL} style={{
                            width: '300px',
                            height: '500px'
                        }} rounded />
                    </Col>
                    <Col md={4}>
                        <div>
                            <h4>Author: {this.state.item.author}</h4>
                            <h4>Publisher: {this.state.item.publisher}</h4>
                            <h4>Pages: {this.state.item.pages}</h4>
                            <h4>Price: {this.state.item.price} VND</h4>
                        </div>
                        <Form>
                            <Form.Group>
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control as="select" onChange={(event) => this.onSelect(event)}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </Form.Group>
                            <Button variant="outline-primary" onClick={() => this.onSubmit(this.state.item._id)}>Order</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

        );
    }
}

const mapStateToProps = state => {
    return {
        productList: state.productList.product,
        ordersInfo: state.ordersInfo
    }
}

const mapDispactchToProps = dispatch => {
    return {
        addOrder: (id, quantity, price, title) => dispatch({ type: actionTypes.ADD_ITEM, item: { id, quantity, price: (quantity * price).toFixed(2), title } })
    }
}

export default connect(mapStateToProps, mapDispactchToProps)(ItemDetail);