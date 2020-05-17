import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import EditForm from './EditForm/EditForm';

class EditModal extends Component {
    state = {
        editedData: Object.create(null),
        loaded: false,
        error: {
            title: null,
            author: null,
            price: null,
            publisher: null,
            pages: null
        }
    };


    componentDidUpdate() {
        if (this.props.opened === true && !this.state.loaded) {
            this.setState({
                editedData: { ...this.props.modalData },
                loaded: true
            })
        }
    }

    closeModal = () =>{
        this.setState({
            error: {
                title: null,
                author: null,
                price: null,
                publisher: null,
                pages: null
            }
        })
        this.props.closed();
    }
    editDetailHandler = (event) => {

        //Validation
        let error = this.state.error;
        switch (event.target.name) {
            case 'title':
                if (event.target.value.length === 0) {
                    error.title = 'Cannot be empty'
                } else {
                    error.title = null;
                }
                break;
            case 'author':
                if (event.target.value.length === 0) {
                    error.author = 'Cannot be empty'
                } else {
                    error.author = null;
                }
                break;
            case 'publisher':
                if (event.target.value.length === 0) {
                    error.publisher = 'Cannot be empty'
                } else {
                    error.publisher = null;
                }
                break;
            case 'price':
                if (event.target.value < 1000) {
                    error.price = 'Prices must be over 1000 VND'
                } else {
                    error.price = null;
                }
                break;
            case 'pages':
                error.pages = 'Cannot be empty';
                if (event.target.value > 0) {
                    error.pages = null;
                }
                break;
            default:
                break;
        }

        if (event.target.name === "availability") {
            const value = event.target.value === 'yes' ? true : false;
            this.setState({
                editedData: { ...this.state.editedData, [event.target.name]: value , error }
            })
        } else {
            this.setState({
                editedData: { ...this.state.editedData, [event.target.name]: event.target.value , error}
            })
        }

    };
    render() {
        return (
            <Modal show={this.props.opened} onHide={this.props.closed}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditForm
                        onEdit={(event) => this.editDetailHandler(event)}
                        productData={this.props.modalData}
                        error = {this.state.error} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={this.closeModal}>
                        Close
            </Button>
                    <Button variant="outline-primary" onClick={() => this.props.updatedData(this.state.editedData, this.state.error)}>
                        Save Changes
            </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default EditModal;

