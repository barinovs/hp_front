import React, {useEffect, useState, useContext} from 'react'
import {Button, Form} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import {createAdQueryByAdmin} from '../../http/adQueryApi'
import {getAllUsers} from '../../http/userApi'
import {observer} from 'mobx-react-lite'

const CreateAdQuery = ({show, onHide, forAdmin, userId, refreshAdQueries}) => {
    const [users, setUsers] = useState([])
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')
    const [selectedUser, setSelectedUser] = useState(0)

    useEffect(() => {
        getAllUsers().then((res) => {
            setUsers(res)
        })
    }, [])

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить запрос
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder="Введите строку запроса"
                        className="mt-3 required"
                        controlId="formValidationError1"
                        value={url}
                        onChange={(e) => {
                            setUrl(e.target.value)
                        }}
                    />
                    <Form.Control
                        placeholder="Введите описание для запроса"
                        className="mt-3"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                    />
                    {forAdmin && (
                        <Form.Select
                            className="mt-3"
                            onChange={(e) => {
                                setSelectedUser(e.target.value)
                            }}
                        >
                            {users.map((item) => {
                                return (
                                    <option key={item.id} value={item.id}>
                                        {item.email}
                                    </option>
                                )
                            })}
                        </Form.Select>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Закрыть
                </Button>

                <Button
                    variant="outline-dark"
                    onClick={() =>
                        createAdQueryByAdmin({
                            url,
                            description,
                            userId: forAdmin ? selectedUser : userId,
                        }).then((res) => {
                            refreshAdQueries()
                            onHide()
                        })
                    }
                >
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateAdQuery
