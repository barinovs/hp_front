import React from 'react'
import {Button, Form} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'

const CreateAdQuery = ({show, onHide}) => {
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить запрос
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control placeholder="Введите строку запроса" />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={onHide}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateAdQuery
