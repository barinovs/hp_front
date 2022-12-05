import React, {useEffect, useState, useContext} from 'react'
import {Button, Form} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import {createAdQueryByAdmin, getAvitoLocations} from '../../http/adQueryApi'
import {getAllUsers} from '../../http/userApi'
import {observer} from 'mobx-react-lite'
import axios from 'axios'
import LocationsList from './LocationsList'

const CreateAdQuery = ({show, onHide, forAdmin, userId, refreshAdQueries}) => {
    const [users, setUsers] = useState([])
    const [url, setUrl] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [selectedUser, setSelectedUser] = useState(userId)
    const [showLocationsList, setShowLocationsList] = useState(false)
    const [locationsList, setLocationsList] = useState([])

    useEffect(() => {
        getAllUsers().then((res) => {
            setUsers(res)
        })
    }, [])

    const handleLocationChoice = (location) => {
        setShowLocationsList(false)
        setLocation(location)
    }

    const handleCityChange = async (queryStr) => {
        setLocation(queryStr)
        const {data} = await getAvitoLocations(queryStr)
        setLocationsList(data)
    }

    return (
        <>
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
                        <Form.Control
                            placeholder="Введите название города"
                            className="mt-3"
                            value={location}
                            onChange={(e) => {
                                setShowLocationsList(true)
                                handleCityChange(e.target.value)
                            }}
                            onFocus={() => {}}
                        />
                        {forAdmin && (
                            <Form.Select
                                className="mt-3"
                                onChange={(e) => {
                                    setSelectedUser(e.target.value)
                                    console.log('selectedUser', selectedUser) //TODO убрать этот console.log
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
                                setDescription('')
                                setUrl('')
                            })
                        }
                    >
                        Добавить
                    </Button>
                </Modal.Footer>
                <LocationsList
                    show={showLocationsList}
                    handleLocationChoice={handleLocationChoice}
                    items={locationsList}
                ></LocationsList>
            </Modal>
        </>
    )
}

export default CreateAdQuery

// https://m.avito.ru/api/11/items?key=af0deccbgcgidddjgnvljitntccdduijhdinfgjgfjir&categoryId=9&locationId=625650&radius=50&localPriority=1&params[1283]=14756&priceMin=600000&priceMax=850000&params[1375-to-int]=130000&params[1167]=19984&params[110907]=478239&params[697]=8856&params[696]=8854&isGeoProps=true&forceLocation=true&page=1&display=list&limit=25&presentationType=serp
// Все авто Череповца ц.600-850, пробег до 130? <= 2 влад
