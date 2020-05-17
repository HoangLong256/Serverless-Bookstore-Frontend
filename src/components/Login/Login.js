import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import { Auth } from "aws-amplify";
import * as actionTypes from '../../redux/actions/actionTypes'
import styles from './Login.module.css'
class Login extends Component {
    state = {
        email: '',
        password: '',
        error: {
            email: '',
            password: ''
        }
    };

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
            case 'password':
                if (event.target.value.length < 6) {
                    error.password = 'Password length must be greater than 6'
                } else {
                    error.password = null;
                }
                break;
            default:
                break;
        }
        this.setState({
            [event.target.name]: event.target.value,
            error
        })


    }
    onSubmit = async () => {
        try {
            let notError = true;
            for (let el in this.state.error) {
                if (this.state.error[el] !== null) {
                    notError = false;
                }
            }
            if (notError) {
                await Auth.signIn(this.state.email, this.state.password);
                await Auth.currentSession();
                this.props.loginSuccess();
                this.props.history.push('/product');
            } else {
                alert('Login Error');
            }
        } catch (e) {
            alert(e.message);
        }
    }
    render() {
        return (
            <Container className="mt-5" style={{
                minHeight: `${window.innerHeight - 168}px`
            }}>
                <Row className="mt-5  p-20">
                    <Col md={6} className={styles.imageCover + ' d-none d-md-block' }> </Col>
                    <Col md={6} className={styles.formContainer}>
                        <h1>Login Form</h1>
                        <Form >
                            <Form.Group >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email"
                                    name="email" onChange={(event) => this.onEnterInfo(event)} />
                                <Form.Text className={styles.errorColor}>
                                    {this.state.error.email}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"
                                    name="password" onChange={(event) => this.onEnterInfo(event)} />
                                <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
                                <Form.Text className={styles.errorColor}>
                                    {this.state.error.password}
                                </Form.Text>
                            </Form.Group>
                            <Button variant="outline-primary" onClick={this.onSubmit}>
                                Login
                             </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        loginStatus: state.authStatus.loginStatus
    }
}

const mapDispactchToProps = dispatch => {
    return {
        loginSuccess: () => dispatch({ type: actionTypes.LOGIN_SUCCESSFUL })
    }
}

export default connect(mapStateToProps, mapDispactchToProps)(Login);