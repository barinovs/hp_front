import React, {useEffect, useState, useContext} from 'react'
import {Button, Form, Row} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import {createAdQueryByAdmin, getAvitoLocations} from '../../http/adQueryApi'
import {getAllUsers} from '../../http/userApi'
import {observer} from 'mobx-react-lite'
import axios from 'axios'
import LocationsList from './LocationsList'
import 'react-select-search/style.css'
import {getAllCarMarks, getCarModels} from '../../http/carsApi'
import Select from 'react-select'

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
    const [selectedCarLabel, setSelectedCarLabel] = useState('')
    const [carModelsOptions, setCarModelsOptions] = useState([])
    const [selectedCarModel, setSelectedCarModel] = useState('')
    const [selectedCarModelLabel, setSelectedCarModelLabel] = useState('')
    const [mileageMin, setMileageMin] = useState('')
    const [mileageMax, setMileageMax] = useState('')
    const [priceMin, setPriceMin] = useState('')
    const [priceMax, setPriceMax] = useState('')
    const [yearMin, setYearMin] = useState('')
    const [yearMax, setYearMax] = useState('')
    const [queryStr, setQueryStr] = useState('')

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

    useEffect(() => {
        let query = queryStr
        const locationQuery = locationId ? `&locationId=${locationId}` : ''
        const carMarkQuery = selectedCar ? `&params[110000]=${selectedCar}` : ''
        const carMModelQuery = selectedCarModel
            ? `&params[110001]=${selectedCarModel}`
            : ''

        // Пробег С
        const mileageMinQuery = mileageMin
            ? `&params[1375-from-int]=${mileageMin}`
            : ''
        // Пробег По
        const mileageMaxQuery = mileageMax
            ? `&params[1375-to-int]=${mileageMax}`
            : ''

        // Год С
        const yearMinQuery = yearMin ? `&params[188-from-int]=${yearMin}` : ''
        // Год По
        const yearMaxQuery = yearMax ? `&params[188-to-int]=${yearMax}` : ''
        // Цена С
        const priceMinQuery = priceMin ? `&priceMin=${priceMin}` : ''
        // Цена По
        const priceMaxQuery = priceMax ? `&priceMax=${priceMax}` : ''

        query = `https://m.avito.ru/api/11/items?key=af0deccbgcgidddjgnvljitntccdduijhdinfgjgfjir&categoryId=9${locationQuery}&radius=0&localPriority=1${carMarkQuery}${carMModelQuery}${priceMinQuery}${priceMaxQuery}${mileageMinQuery}${mileageMaxQuery}${yearMinQuery}${yearMaxQuery}&page=1&display=list&limit=25&presentationType=serp`
        setQueryStr(query)
        setUrl(query)
    }, [
        locationId,
        selectedCar,
        selectedCarModel,
        priceMin,
        priceMax,
        mileageMin,
        mileageMax,
        yearMax,
        yearMin,
    ])

    const handleLocationChoice = (value, label) => {
        setShowLocationsList(false)
        setLocation(location)
        setLocationId(value)
        const s = queryStr + locationId
        setQueryStr(s)
    }

    const handleLocationChange = async (queryStr) => {
        setLocation(queryStr)
        let {data} = await getAvitoLocations(queryStr)
        data = data.map((item) => {
            item.label = `${item.label} (${item.region.name})`
            return item
        })
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
                        {/* <Form.Control
                            placeholder="Введите строку запроса"
                            className="mt-3 required"
                            value={url}
                            onChange={(e) => {
                                setUrl(e.target.value)
                            }}
                        /> */}
                        <Form.Control
                            placeholder="Введите описание для запроса"
                            className="mt-3"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                        />

                        <Row className="mt-3">
                            <Select
                                placeholder="Введите название города"
                                options={locationsList}
                                onChange={({value, label}) => {
                                    handleLocationChoice(value, label)
                                }}
                                onInputChange={(e) => {
                                    console.log(e)
                                    handleLocationChange(e)
                                }}
                            ></Select>
                        </Row>

                        <Row className="mt-3">
                            <Select
                                placeholder="Введите марку автомобиля"
                                options={carsOptions}
                                onChange={({value, label}) => {
                                    setSelectedCar(value)
                                    setSelectedCarModel('')
                                    setSelectedCarLabel(label)
                                }}
                                text={selectedCarLabel}
                            ></Select>
                        </Row>

                        <Row className="mt-3">
                            <Select
                                placeholder="Введите модель автомобиля"
                                options={carModelsOptions}
                                onChange={({value, label}) => {
                                    setSelectedCarModel(value)
                                    setSelectedCarModelLabel(label)
                                }}
                                text={selectedCarModelLabel}
                            ></Select>
                        </Row>

                        <div className="d-flex flex-row">
                            <Form.Control
                                placeholder="Пробег от"
                                className="mt-3 me-3"
                                value={mileageMin}
                                type="number"
                                style={{width: '150px'}}
                                onChange={(e) => {
                                    setMileageMin(e.target.value)
                                }}
                            />

                            <Form.Control
                                placeholder="Пробег до"
                                className="mt-3"
                                value={mileageMax}
                                type="number"
                                style={{width: '150px'}}
                                onChange={(e) => {
                                    setMileageMax(e.target.value)
                                }}
                            />
                        </div>

                        <div className="d-flex flex-row">
                            <Form.Control
                                placeholder="Цена от"
                                className="mt-3 me-3"
                                value={priceMin}
                                type="number"
                                style={{width: '150px'}}
                                onChange={(e) => {
                                    setPriceMin(e.target.value)
                                }}
                            />

                            <Form.Control
                                placeholder="Цена до"
                                className="mt-3"
                                value={priceMax}
                                type="number"
                                style={{width: '150px'}}
                                onChange={(e) => {
                                    setPriceMax(e.target.value)
                                }}
                            />
                        </div>

                        <div className="d-flex flex-row">
                            <Form.Control
                                placeholder="Год выпуска с"
                                className="mt-3 me-3"
                                value={yearMin}
                                type="number"
                                style={{width: '150px'}}
                                onChange={(e) => {
                                    setYearMin(e.target.value)
                                }}
                            />

                            <Form.Control
                                placeholder="Год выпуска по"
                                className="mt-3"
                                value={yearMax}
                                type="number"
                                style={{width: '150px'}}
                                onChange={(e) => {
                                    setYearMax(e.target.value)
                                }}
                            />
                        </div>

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
                        Собрать строку
                    </Button>
                    <Button variant="outline-danger" onClick={onHide}>
                        Закрыть
                    </Button>

                    <Button
                        variant="outline-dark"
                        onClick={() => {
                            // debugger //FIXME Удалить этот debugger
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
                        }}
                    >
                        Добавить
                    </Button>
                </Modal.Footer>
                {/* <LocationsList
                    show={showLocationsList}
                    handleLocationChoice={handleLocationChoice}
                    items={locationsList}
                ></LocationsList> */}
            </Modal>
        </>
    )
}

export default CreateAdQuery

// https://m.avito.ru/api/11/items?key=af0deccbgcgidddjgnvljitntccdduijhdinfgjgfjir&categoryId=9&locationId=625650&radius=50&localPriority=1&params[1283]=14756&priceMin=600000&priceMax=850000&params[1375-to-int]=130000&params[1167]=19984&params[110907]=478239&params[697]=8856&params[696]=8854&isGeoProps=true&forceLocation=true&page=1&display=list&limit=25&presentationType=serp
// Все авто Череповца ц.600-850, пробег до 130? <= 2 влад
