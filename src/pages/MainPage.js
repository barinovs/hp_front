import React, {useContext} from 'react'
import {Container} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from '../utils/consts'
import {Context} from '..'

const MainPage = () => {
    const {user} = useContext(Context)
    console.log('user.isAuth', user.isAuth)
    return (
        <Container>
            {!user.isAuth ? (
                <h4>
                    Пожалуйста,{' '}
                    <NavLink to={LOGIN_ROUTE}>авторизуйтесь</NavLink> или{' '}
                    <NavLink to={REGISTRATION_ROUTE}>зарегистрируйтесь</NavLink>{' '}
                    для входа в закрытую часть сайта
                </h4>
            ) : (
                <h4>Закрытая часть</h4>
            )}
        </Container>
    )
}

export default MainPage
