import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../redux/actions/actionTypes';
import Item from './Item/Item';
import { Container, Row, Col } from 'react-bootstrap';

class Shopping extends Component {
    state = {
        loading: false
    }

    fetchData = async (index = 1) => {
        const url = "https://aef1nhb6nb.execute-api.ap-southeast-1.amazonaws.com/dev/books";
        try {
            const response = await axios.get(url);
            this.props.addProduct(response.data);
            this.setState({
                loading: false
            })
        } catch (error) {
            if(error.response.status === 502 && index > 1){
                this.fetchData(index--);
            }
        }
    }

    componentDidMount() {
        this.setState({
            loading: true
        }, ()=> this.fetchData(2))
        
    }

    viewItemDetail = (id) => {
        this.props.history.push('/store/item/' + id);

    }
    render() {
        return (
            <div>
                <h1>Shopping</h1>
                <Container>
                    <Row>
                        <Col className="d-md-flex justify-content-around m-auto">
                            {this.state.loading ? 'Loading...' : ''}
                            {!this.props.productList ? ''
                                : this.props.productList.map((item) => (
                                    <Item key={item._id}
                                        itemInfo={item}
                                        clicked={() => this.viewItemDetail(item._id)} />
                                ))}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        productList: state.productList.product
    }
}

const mapDispactchToProps = dispatch => {
    return {
        addProduct: (data) => dispatch({ type: actionTypes.ADD_PRODUCT, productData: data })
    }
}

export default connect(mapStateToProps, mapDispactchToProps)(Shopping);