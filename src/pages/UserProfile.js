import {observer} from 'mobx-react-lite'
import React, {useContext, useEffect, useState} from 'react'
import {Alert, Col, Container, Form, Row} from 'react-bootstrap'
import {getTelegramId, getUserData, updateTgId} from '../http/userApi'
import {Context} from '../index'

const UserProfile = observer(() => {
    const {user} = useContext(Context)
    const [email, setEmail] = useState(user.userData.email)
    const [telegramId, setTelegramId] = useState(user.userData.telegram_id)
    const [alertMsg, setalertMsg] = useState({})
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        // getTelegramId(user.userData.id).then((res) => {
        //     console.log('res', res) //TODO убрать этот console.log
        // })
        getUserData(user.userData.id).then((res) => {
            user.setUserData(res)
            setTelegramId(res.telegram_id)
        })
    }, [])

    const _updateTgId = async () => {
        const res = await updateTgId(user.userData.id, telegramId)
        if (res.success) {
            setalertMsg({variant: 'success', message: res.message})
        } else {
            setalertMsg({variant: 'danger', message: res.message})
        }
        setShowAlert(true)
        setTimeout(() => setShowAlert(false), 3000)
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Данные вашего профиля:</h3>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Telegram ID:</Form.Label>
                            <Form.Control
                                value={telegramId}
                                onChange={(e) => setTelegramId(e.target.value)}
                                onBlur={_updateTgId}
                            ></Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Alert show={showAlert} variant={alertMsg.variant}>
                {alertMsg.message}
            </Alert>
        </Container>
    )
})

export default UserProfile
