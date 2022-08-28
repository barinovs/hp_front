import {observer} from 'mobx-react-lite'
import React, {useContext, useState} from 'react'
import {Button, Card, Container, Form, Row} from 'react-bootstrap'
import {NavLink, useHistory, useLocation} from 'react-router-dom'
import {Context} from '..'
import {login, registration} from '../http/userApi'
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from '../utils/consts'

const Auth = observer(() => {
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {user} = useContext(Context)

    const click = async () => {
        try {
            let data

            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setUser(user)
            user.setIsAuth(true)
            user.setIsAdmin(data.isAdmin)

            history.push(MAIN_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">
                    {' '}
                    {isLogin ? 'Авторизация' : 'Регистрация'}
                </h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        placeholder="Введите e-mal"
                        className="mt-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control
                        placeholder="Введите пароль"
                        className="mt-3"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Row className="d-flex justify-content-between mt-3 ps-3 pe-3">
                        {isLogin ? (
                            <div className="p-2" style={{width: '300px'}}>
                                Нет аккаунта?{' '}
                                <NavLink
                                    to={REGISTRATION_ROUTE}
                                    className="p-2"
                                >
                                    Зарегистрируйтесь
                                </NavLink>
                            </div>
                        ) : (
                            <div className="p-2" style={{width: '300px'}}>
                                Есть аккаунт?{' '}
                                <NavLink to={LOGIN_ROUTE} className="p-2">
                                    Войдите!
                                </NavLink>
                            </div>
                        )}

                        <Button
                            variant="outline-success"
                            style={{width: '150px'}}
                            onClick={() => {
                                // user.setIsAuth(true)
                                click()
                            }}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
})

export default Auth
