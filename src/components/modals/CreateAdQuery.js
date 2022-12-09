import React, {useEffect, useState, useContext} from 'react'
import {Button, Form, Row} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import {createAdQueryByAdmin, getAvitoLocations} from '../../http/adQueryApi'
import {getAllUsers} from '../../http/userApi'
import {observer} from 'mobx-react-lite'
import axios from 'axios'
import LocationsList from './LocationsList'
import SelectSearch from 'react-select-search'
import 'react-select-search/style.css'
import {getAllCarMarks, getCarModels} from '../../http/carsApi'

const CreateAdQuery = ({show, onHide, forAdmin, userId, refreshAdQueries}) => {
    const [users, setUsers] = useState([])
    const [url, setUrl] = useState('')
    const [location, setLocation] = useState('')
    const [locationId, setLocationId] = useState('')
    const [description, setDescription] = useState('')
    const [selectedUser, setSelectedUser] = useState(userId)
    const [showLocationsList, setShowLocationsList] = useState(false)
    const [locationsList, setLocationsList] = useState([])
    const [carsOptions, setCarsOptions] = useState([])
    const [selectedCar, setSelectedCar] = useState('')
    const [carModelsOptions, setCarModelsOptions] = useState([])
    const [selectedCarModel, setSelectedCarModel] = useState('')
    // https://m.avito.ru/api/11/items?key=af0deccbgcgidddjgnvljitntccdduijhdinfgjgfjir&categoryId=9&locationId=625390&radius=0&localPriority=1&priceMax=850000&params[110000]=329253&params[110001]=330812&params[110005][]=335695&params[110005][]=335693&params[110005][]=335694&params[110907]=478239&params[697]=8856&isGeoProps=true&forceLocation=true&page=1&lastStamp=1663793760&display=list&limit=25&presentationType=serp
    const [queryStr, setQueryStr] = useState(
        `https://m.avito.ru/api/11/items?key=af0deccbgcgidddjgnvljitntccdduijhdinfgjgfjir&categoryId=9&locationId=`
    )

    useEffect(() => {
        getAllUsers().then((res) => {
            setUsers(res)
        })

        getAllCarMarks().then((res) => {
            setCarsOptions(res)
        })
    }, [])

    useEffect(() => {
        getCarModels(selectedCar).then((res) => {
            setCarModelsOptions(res)
        })
    }, [selectedCar])

    const handleLocationChoice = (name, id) => {
        setShowLocationsList(false)
        setLocation(location)
        setLocationId(id)
        debugger //FIXME Удалить этот debugger
        const s = queryStr + locationId
        setQueryStr(s)
    }

    const handleCityChange = async (queryStr, e) => {
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
                                handleCityChange(e.target.value, e)
                            }}
                            onFocus={() => {}}
                        />

                        <SelectSearch
                            options={[]}
                            value={location}
                            name="location"
                            placeholder="Выберите город"
                            search={true}
                            onChange={(value) => {
                                // setLocation(value)
                                console.log('value ', value) //FIXME Удалить этот console.log()
                            }}
                            onBlur={(e) => {
                                console.log('e ', e) //FIXME Удалить этот console.log()
                            }}
                            onKeyUp={(e) => {
                                console.log(e)
                            }}
                        />
                        <Row>
                            <SelectSearch
                                options={carsOptions}
                                value={selectedCar}
                                name="carMark"
                                placeholder="Выберите марку"
                                search={true}
                                onChange={(value) => {
                                    setSelectedCar(value)
                                }}
                            />
                        </Row>

                        <Row>
                            <SelectSearch
                                options={carModelsOptions}
                                value={selectedCarModel}
                                name="carModel"
                                placeholder="Выберите модель"
                                search={true}
                                onChange={(value) => {
                                    setSelectedCarModel(value)
                                }}
                            />
                        </Row>

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
                    <div>{queryStr}</div>
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
