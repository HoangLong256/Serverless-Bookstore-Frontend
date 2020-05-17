import React, { Component } from 'react';
import axios from 'axios'
import { Table, Button, Container, Col, Row } from 'react-bootstrap';
import EditModal from './Modal/EditModal';
import DataModal from './Modal/DataModal';
import CreateModal from './Modal/CreateModal';

class Product extends Component {
    state = {
        openEditModal: false,
        openDataModal: false,
        openCreateModal: false,
        editData: Object.create(null),
        viewData: Object.create(null),
        bookProduct: [],
        reloaded: false
    }

    deleteDataHandler(id) {
        const URL = "https://aef1nhb6nb.execute-api.ap-southeast-1.amazonaws.com/dev/books/" + id;
        axios.delete(URL)
            .then((response) => {
                console.log(response);
                this.setState({
                    reloaded: true
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    fetchData = async (index = 1) => {
        const url = "https://aef1nhb6nb.execute-api.ap-southeast-1.amazonaws.com/dev/books";
        try {
            const response = await axios.get(url)
            this.setState({
                bookProduct: [...response.data]
            })
        } catch (error) {
            if (error.response.status === 502 && index > 1) {
                this.fetchData(index--)
            }
        }
    }

    componentDidUpdate() {
        if (this.state.reloaded === true) {
            this.fetchData(2);
            this.setState({
                reloaded: false
            })
        }
    }

    componentDidMount() {
        this.fetchData(2);
    }
    //Data Modal
    openDataModalHandler = (data) => {
        console.log('Click');
        this.setState({
            openDataModal: true,
            viewData: { ...data }
        }, () => {
            console.log(this.state)
        })
    }

    closeDataModalHandler = () => {
        console.log('Close data modal');
        this.setState({
            openDataModal: false,
            viewData: Object.create(null)
        })
    }

    //Edit Modal

    openEditModalHandler = (data) => {
        this.setState({
            openEditModal: true,
            editData: { ...data }
        });
    }
    closeEditModalHandler = () => {
        this.setState({
            openEditModal: false,
            editData: Object.create(null),
        });

    }

    // Create Modal
    openCreateModalHandler = () => {
        console.log('Open Create');
        this.setState({
            openCreateModal: true
        })
    }

    closeCreateModalHandler = () => {
        this.setState({
            openCreateModal: false,
            reloaded: true
        })
    }

    updatedDataHandler = (data, error) => {
        let notError = true;
        for (let el in error) {
            if (error[el] !== null) {
                notError = false;
            }
        }
        if (!notError) {
            alert('Form Error')
            return
        }
        const URL = 'https://aef1nhb6nb.execute-api.ap-southeast-1.amazonaws.com/dev/books/' + data._id;
        axios.put(URL, {
            author: data.author,
            pages: data.pages,
            price: data.prices,
            publisher: data.publisher,
            availability: data.availability,
            description: data.description,
            year: data.year,
            title: data.title
        })
            .then(res => {
                this.setState({
                    reloaded: true
                }, this.closeEditModalHandler())
            })
            .catch(error => {
                console.log(error);
                console.log(error.response.status);

            });
    }
    render() {
        return (
            <Container>
                <Row >
                    <Col className="mt-5">
                        <h1>Product Information</h1>
                        <Button variant="outline-primary" onClick={this.openCreateModalHandler}>Create</Button>
                        <Table striped bordered hover responsive className="mt-3">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Price</th>
                                    <th>View</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.bookProduct.map((product, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{product.title}</td>
                                        <td>{product.author}</td>
                                        <td>{product.price}</td>
                                        <td><Button variant="outline-info" onClick={() => this.openDataModalHandler(product)}>View</Button></td>
                                        <td><Button variant="outline-warning" onClick={() => this.openEditModalHandler(product)}>Edit</Button></td>
                                        <td><Button variant="outline-danger" onClick={() => this.deleteDataHandler(product._id)}>Delete</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <EditModal opened={this.state.openEditModal}
                            closed={this.closeEditModalHandler}
                            modalData={this.state.editData}
                            updatedData={(data, error) => this.updatedDataHandler(data, error)} />
                        <CreateModal opened={this.state.openCreateModal}
                            closed={this.closeCreateModalHandler} />
                        <DataModal opened={this.state.openDataModal}
                            closed={this.closeDataModalHandler}
                            modalData={this.state.viewData} />
                    </Col>
                </Row>
            </Container>
        );
    }
}



export default Product;