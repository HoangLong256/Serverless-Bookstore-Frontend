import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import DataModal from './Modal/DataModal';
class Order extends Component {
    state = {
        orders: [],
        reloaded: false,
        openDataModal: false,
        selectedData: Object.create(null)
    }

    fetchData = async (index = 1) => {
        const url = "https://aef1nhb6nb.execute-api.ap-southeast-1.amazonaws.com/dev/orders";
        try{
            const response = await axios.get(url);
            this.setState({
                orders: [...response.data]
            })
        }catch(error){
            if(error.response.status === 502 && index > 1){
                this.fetchData(index--)
            }
        }
        

    }
    componentDidMount() {
        this.fetchData(2);
    }

    componentDidUpdate() {
        if (this.state.reloaded === true) {
            this.fetchData(2);
            this.setState({
                reloaded: false
            })
        }
    }

    //Delete Order
    deleteDataHandler = (id) => {
        const URL = "https://aef1nhb6nb.execute-api.ap-southeast-1.amazonaws.com/dev/orders/" + id;
        axios.delete(URL)
            .then((response) => {
                this.setState({
                    reloaded: true
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //Update Ship Status
    updateDataHandler = (id) => {
        const URL = "https://aef1nhb6nb.execute-api.ap-southeast-1.amazonaws.com/dev/orders/" + id;
        axios.put(URL, { shipped: true })
            .then((response) => {
                this.setState({
                    reloaded: true
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //Data Modal
    openDataModalHandler = (data) => {
        this.setState({
            openDataModal: true,
            selectedData: { ...data }
        })
    }

    closeDataModalHandler = () => {
        this.setState({
            openDataModal: false,
            selectedData: Object.create(null)
        })
    }

    render() {
        return (
            <Container className="mt-5">
                <Row>
                    <Col className="m-auto">
                        <h1>Order Summary</h1>
                        <Table striped bordered hover responsive className="mt-3">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Shipped</th>
                                    <th>View</th>
                                    <th>Update Shipped Status</th>
                                    <th>Cancel</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.orders.map((order, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{order.name}</td>
                                        <td>{order.phone}</td>
                                        <td>{order.address}</td>
                                        <td>{order.shipped ? 'Yes' : 'No'}</td>
                                        <td><Button variant="outline-info" onClick={() => this.openDataModalHandler(order)} >View</Button></td>
                                        <td><Button variant="outline-warning" disabled={order.shipped} onClick={() => this.updateDataHandler(order._id)}>Update</Button></td>
                                        <td><Button variant="outline-danger" onClick={() => this.deleteDataHandler(order._id)}>Delete</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <DataModal opened={this.state.openDataModal}
                            closed={this.closeDataModalHandler}
                            modalData={this.state.selectedData} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Order;