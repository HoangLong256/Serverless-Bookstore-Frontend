import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import * as actionTypes from '../../redux/actions/actionTypes';
import styles from './CheckOut.module.css';
class CheckOut extends Component {
    state = {
        customer: {
            name: '',
            email: '',
            address: '',
            phone: ''
        },
        error: {
            email: 'Cannot be empty',
            phone: 'Cannot be empty',
            address: 'Cannot be empty',
            name: 'Cannot be empty'
        }
    }

    onEnterInfo = (event) => {
        let error = this.state.error;
        switch (event.target.name) {
            case 'email':
                const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                if (!pattern.test(event.target.value)) {
                    error.email = 'Please enter the correct email';
                } else {
                    error.email = null;
                }
                break;
            case 'phone':
                if (event.target.value.length < 8) {
                    error.phone = 'Phone number must be greater than 8'
                } else {
                    error.phone = null;
                }
                break;
            case 'name':
                if (event.target.value.length === 0) {
                    error.name = 'Cannot be empty'
                } else {
                    error.name = null;
                }
                break;
            case 'address':
                if (event.target.value.length === 0) {
                    error.address = 'Cannot be empty'
                } else {
                    error.address = null;
                }
                break;
            default:
                break;
        }
        const customerInfo = {
            ...this.state.customer,
            [event.target.name]: event.target.value
        }
        this.setState({
            customer: customerInfo,
            error
        })
    }

    placeYourOrderHandler = () => {
        let notError = true;
        for(let el in this.state.error){
            if(this.state.error[el] !== null){
                notError = false;
            }
        }

        if (!notError) {
            alert('Form Error');
            return;
        }
        const data = {
            ...this.state.customer,
            books: [...this.props.ordersInfo.orders],
            totalPrice: this.props.ordersInfo.totalPrice
        }
        const URL = 'https://aef1nhb6nb.execute-api.ap-southeast-1.amazonaws.com/dev/orders/';
        axios.post(URL, data)
            .then(res => {
                this.props.clearOrder();
                alert('Your Order are Placed');
                this.props.history.push('/store');
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Group >
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name"
                            name="name" onChange={(event) => this.onEnterInfo(event)} />
                        <Form.Text className={styles.errorColor}>
                            {this.state.error.name}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email"
                            name="email" onChange={(event) => this.onEnterInfo(event)} />
                        <Form.Text className={styles.errorColor}>
                            {this.state.error.email}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="number" placeholder="Enter your phone"
                            name="phone" onChange={(event) => this.onEnterInfo(event)} />
                        <Form.Text className={styles.errorColor}>
                            {this.state.error.phone}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter your address"
                            name="address" onChange={(event) => this.onEnterInfo(event)} />
                        <Form.Text className={styles.errorColor}>
                            {this.state.error.address}
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" onClick={() => this.placeYourOrderHandler()}>
                        Place Your Order
                    </Button>
                </Form>
            </div>
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
        removeItem: (id) => dispatch({ type: actionTypes.REMOVE_ITEM, id }),
        clearOrder: () => dispatch({ type: actionTypes.CLEAR_ORDER })
    }
}

export default connect(mapStateToProps, mapDispactchToProps)(CheckOut);