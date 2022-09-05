import React, {useContext, useEffect, useState} from 'react'
import {Container, Table} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from '../utils/consts'
import {Context} from '..'
import {getAdQueriesByUserId} from '../http/adQueryApi'
import AdQueriesTable from '../components/AdQueriesTable'

const MainPage = () => {
    const {user} = useContext(Context)
    const [adQueries, setAdQueries] = useState([])
    const _getAdQueriesByUserId = async () => {
        let _adQueries = await getAdQueriesByUserId(user.user.id)
        setAdQueries(_adQueries)
    }
    console.log('adQueries', adQueries) //TODO убрать этот console.log

    useEffect(() => {
        _getAdQueriesByUserId()
    }, [])

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
                <AdQueriesTable arr={adQueries} />
            )}
        </Container>
    )
}

export default MainPage
