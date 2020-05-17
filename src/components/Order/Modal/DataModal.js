import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class DataModal extends Component {
    state = {
        loaded: false,
        viewData: {
            books: []
        }
    }
    componentDidUpdate() {
        if (this.props.opened === true && !this.state.loaded) {
            console.log(this.props.modalData)
            this.setState({
                viewData: { ...this.props.modalData },
                loaded: true
            });
        }
    }

    onCloseModal = () => {
        this.setState({
            viewData: {
                books:[]
            },
            loaded: false
        });
        this.props.closed();
    }
    render() {


        return (
            <Modal show={this.props.opened} onHide={this.props.closed}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Name           :</strong><span />{this.state.viewData.name}</p>
                    <p><strong>Address        :</strong><span />{this.state.viewData.address}</p>
                    <p><strong>Email        :</strong>{this.state.viewData.email}</p>
                    <p><strong>Phone          :</strong>{this.state.viewData.phone}</p>
                    <p><strong>Total Price    :</strong>{this.state.viewData.totalPrice}</p>
                    <p><strong>Shipped Status :</strong>{this.state.viewData.shipped ? 'Yes' : 'No'}</p>
                    <p><strong>Orders :</strong></p>
                    {
                        this.state.viewData.books.map((el, index) => (
                            <div key={index}>
                                <p><strong>#{index + 1}</strong></p>
                                <p>Title : {el.title}</p>
                                <p>Quantity : {el.quantity}</p>
                                <p></p>
                            </div>
                        ))
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.onCloseModal}>
                        Close
            </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default DataModal;

