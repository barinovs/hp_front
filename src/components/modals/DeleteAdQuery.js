import React from 'react'
import {Button, Modal} from 'react-bootstrap'

const DeleteAdQuery = ({show, onHide, deleteAdQuery, description}) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удаление запроса
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>Действительно удалить запрос {description}?</Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="outline-danger" onClick={deleteAdQuery}>
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteAdQuery
