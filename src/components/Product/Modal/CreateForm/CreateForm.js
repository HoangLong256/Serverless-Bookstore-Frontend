import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './CreateForm.module.css'
const CreateForm = (props) => {
    return (
        <Form>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Book Title"
                    name="title" onChange={(event) => props.onEdit(event)} />
                <Form.Text className={styles.errorColor}>
                    {props.error.title}
                </Form.Text>
            </Form.Group>

            <Form.Group>
                <Form.Label>Author</Form.Label>
                <Form.Control type="text" placeholder="Enter Book Author"
                    name="author" onChange={(event) => props.onEdit(event)} />
                <Form.Text className={styles.errorColor}>
                    {props.error.author}
                </Form.Text>
            </Form.Group>

            <Form.Group>
                <Form.Label>Publisher</Form.Label>
                <Form.Control type="text" placeholder="Enter Book Publisher"
                    name="publisher" onChange={(event) => props.onEdit(event)} />
                <Form.Text className={styles.errorColor}>
                    {props.error.publisher}
                </Form.Text>
            </Form.Group>

            <Form.Group>
                <Form.Label>Prices</Form.Label>
                <Form.Control type="number" placeholder="Enter Book Prices"
                    name="price" onChange={(event) => props.onEdit(event)} />
                <Form.Text className={styles.errorColor}>
                    {props.error.price}
                </Form.Text>
            </Form.Group>

            <Form.Group>
                <Form.Label>Pages</Form.Label>
                <Form.Control type="number" placeholder="Enter Book Pages"
                    name="pages" onChange={(event) => props.onEdit(event)} />
                <Form.Text className={styles.errorColor}>
                    {props.error.pages}
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Availability</Form.Label>
                <Form.Control as="select" name="availability" onChange={(event) => props.onEdit(event)}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="file">
                <Form.Label>Attachment</Form.Label>
                <Form.Control type="file" name="file" onChange={(event) => props.onEdit(event)} />
            </Form.Group>
        </Form>
    );
};

export default CreateForm;