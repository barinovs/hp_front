import React from 'react'
import {Button, Card, Container, Form, Row} from 'react-bootstrap'
import {NavLink, useLocation} from 'react-router-dom'
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from '../utils/consts'

const Auth = () => {
    const location = useLocation()
    console.log(location)
    const isLogin = location.pathname === LOGIN_ROUTE
    console.log('isLogin', isLogin)
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
                    />
                    <Form.Control
                        placeholder="Введите пароль"
                        className="mt-3"
                        type="password"
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
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
}

export default Auth
