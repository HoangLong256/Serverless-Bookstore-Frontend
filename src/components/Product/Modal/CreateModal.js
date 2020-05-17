import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import CreateForm from './CreateForm/CreateForm';
import { Storage } from "aws-amplify";


class CreateModal extends Component {
    state = {
        createData: Object.create(null),
        imageFile: null,
        error: {
            title: 'Cannot be empty',
            author: 'Cannot be empty',
            price: 'Cannot be empty',
            publisher: 'Cannot be empty',
            pages: 'Cannot be empty',
            file: 'Cannot be empty'
        }
    }

    createDetailHandler = (event) => {
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
                if (event.target.value > 0) {
                    error.pages = null
                }
                break;
            case 'file':
                if (event.target.files[0].name === null) {
                    error.file = "Please select a file";
                }else if(event.target.files[0].size > 5000000){
                    error.file = "Please select a file < 5MB"
                }else if(event.target.files[0].type.split('/')[0] !== 'image'){
                    error.file = "Not a image file"
                }else {
                    error.file = null;
                }
                break;
            default:
                break;
        }
        if (event.target.name === "availability") {
            const value = event.target.value === 'yes' ? true : false;
            this.setState({
                createData: {
                    ...this.state.createData,
                    [event.target.name]: value,
                    error
                }
            })
        } else if (event.target.name === "file") {
            this.setState({
                imageFile: event.target.files[0],
                error
            })
        } else {
            this.setState({
                createData: {
                    ...this.state.createData,
                    [event.target.name]: event.target.value,
                    error
                }
            })
        }
    }

    addInfoToDatabase = async () => {
        let notError = true;
        for (let el in this.state.error) {
            if (this.state.error[el] !== null) {
                notError = false;
            }
        }
        if (!notError) {
            alert('Form Error');
            return
        }
        try {
            const filename = `${Date.now()}-${this.state.imageFile.name}`;
            const stored = await Storage.vault.put(filename, this.state.imageFile, {
                contentType: this.state.imageFile.type,
            });
            console.log(typeof(stored.key))
            const URL = 'https://aef1nhb6nb.execute-api.ap-southeast-1.amazonaws.com/dev/books/';
            const data = {...this.state.createData,
                            image: stored.key}
            const response = await axios.post(URL, data);
            console.log(response.data);
            this.props.closed();
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <Modal show={this.props.opened} onHide={this.props.closed}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateForm onEdit={(event) => this.createDetailHandler(event)}
                        error={this.state.error} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.closed}>
                        Close
            </Button>
                    <Button variant="primary" onClick={() => this.addInfoToDatabase()}>
                        Create
            </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default CreateModal;

