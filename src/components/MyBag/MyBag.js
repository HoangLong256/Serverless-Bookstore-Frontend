import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Container, Row , Col} from 'react-bootstrap';
import * as actionTypes from '../../redux/actions/actionTypes';
class YourOrder extends Component {

    moveToCheckout = () => {
        this.props.history.push('/checkout')
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>My Bag</h1>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.ordersInfo.orders.map((order, index) => (
                                    <tr key={order.id}>
                                        <td>{index + 1}</td>
                                        <td>{order.title}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.price}</td>
                                        <td><Button variant="outline-danger" onClick={() => this.props.removeItem(order.id)}
                                        >Remove</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <h3>Totol Price: {(this.props.ordersInfo.totalPrice).toLocaleString('en')} VND</h3>
                        <Button  variant="outline-primary" disabled={this.props.ordersInfo.totalPrice == 0}
                            onClick={this.moveToCheckout}>Check Out</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        ordersInfo: state.ordersInfo
    }
}

const mapDispactchToProps = dispatch => {
    return {
        removeItem: (id) => dispatch({ type: actionTypes.REMOVE_ITEM, id })
    }
}

export default connect(mapStateToProps, mapDispactchToProps)(YourOrder);