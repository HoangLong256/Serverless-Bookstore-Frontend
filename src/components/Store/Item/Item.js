import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Storage } from "aws-amplify";

class Item extends Component {
    state = {
        imageURL : ''
    }

    getURL = async () => {
        try {
            let imageURL = await Storage.vault.get(this.props.itemInfo.image);
            this.setState({
                imageURL
            })
        }catch(error){
            console.log(error);
        }
        
    }
    componentDidMount() {
        this.getURL();

    }
    render() {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={this.state.imageURL}
                    style={{
                        width: "100%",
                        height: "200px"
                    }} />
                <Card.Body>
                    <Card.Title><strong>{this.props.itemInfo.title}</strong></Card.Title>
                    <Card.Text>
                        {this.props.itemInfo.price + ' VND'}
                    </Card.Text>
                    <Button variant="outline-info" onClick={this.props.clicked}>View</Button>
                </Card.Body>
            </Card>
        );
    }
}

export default Item;
