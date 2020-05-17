import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';

class DataModal extends Component {
    state = {
        loaded: false,
        viewData: {}
    }
    componentDidUpdate(){
        if(this.props.opened === true && !this.state.loaded){
            this.setState({
                viewData: {...this.props.modalData},
                loaded: true
            })
        }
    }
    render() {
        
        return (
        <Modal show={this.props.opened} onHide={this.props.closed}>
            <Modal.Header closeButton>
            <Modal.Title>Product Summary</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Title        :</strong>{this.state.viewData.title}</p>
                <p><strong>Author       :</strong>{this.state.viewData.author}</p>
                <p><strong>Prices       :</strong>{this.state.viewData.price}</p>
                <p><strong>Pages        :</strong>{this.state.viewData.pages}</p>
                <p><strong>Year         :</strong>{this.state.viewData.year}</p>
                <p><strong>Publisher    :</strong>{this.state.viewData.publisher}</p>
                <p><strong>Availability :</strong>{this.state.viewData.title ? 'Yes' : 'No'}</p>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="outline-secondary" onClick={this.props.closed}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        );
    }
}

export default DataModal;

