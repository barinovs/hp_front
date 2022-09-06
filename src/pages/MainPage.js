import React, {useContext, useEffect, useState} from 'react'
import {Button, Container, Table} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from '../utils/consts'
import {Context} from '..'
import {getAdQueriesByUserId} from '../http/adQueryApi'
import AdQueriesTable from '../components/AdQueriesTable'
import CreateAdQuery from '../components/modals/CreateAdQuery'
import {observer} from 'mobx-react-lite'

const MainPage = observer(() => {
    const {user} = useContext(Context)
    const [adQueries, setAdQueries] = useState([])
    const [createAdQueryVisible, setCreateAdQueryVisible] = useState(false)
    const _getAdQueriesByUserId = async () => {
        let _adQueries = await getAdQueriesByUserId(user.user.id)
        setAdQueries(_adQueries)
    }

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
                <div>
                    {adQueries.length > 0 ? (
                        <AdQueriesTable arr={adQueries} />
                    ) : (
                        <h4>Вы пока не добавили ни одного запроса...</h4>
                    )}
                    <Button
                        variant="outline-dark"
                        onClick={() => {
                            setCreateAdQueryVisible(true)
                        }}
                    >
                        Добавить
                    </Button>
                    <CreateAdQuery
                        show={createAdQueryVisible}
                        onHide={() => setCreateAdQueryVisible(false)}
                        forAdmin={user.user.isAdmin}
                        userId={user.user.id}
                    />
                </div>
            )}
        </Container>
    )
})

export default MainPage
