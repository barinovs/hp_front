import React, {useContext, useEffect, useState} from 'react'
import {Button, Container, Table} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from '../utils/consts'
import {Context} from '../index'
import {getAdQueriesByUserId} from '../http/adQueryApi'
import AdQueriesTable from '../components/AdQueriesTable'
import CreateAdQuery from '../components/modals/CreateAdQuery'
import {observer} from 'mobx-react-lite'

const MainPage = observer(() => {
    const {user} = useContext(Context)
    const {adQuery} = useContext(Context)
    const [adQueries, setAdQueries] = useState([])
    const [createAdQueryVisible, setCreateAdQueryVisible] = useState(false)
    const _getAdQueriesByUserId = async () => {
        let _adQueries = await getAdQueriesByUserId(user.userData.id, 1, 3)
        setAdQueries(_adQueries)
    }

    useEffect(() => {
        getAdQueriesByUserId(user.userData.id, 1, adQuery.limit).then(
            (data) => {
                setAdQueries(data.rows)
                adQuery.setTotalCount(data.count)
            }
        )
    }, [])

    useEffect(() => {
        getAdQueriesByUserId(
            user.userData.id,
            adQuery.page,
            adQuery.limit
        ).then((data) => {
            setAdQueries(data.rows)
            adQuery.setTotalCount(data.count)
        })
    }, [adQuery.page])

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
                        forAdmin={user.isAdmin}
                        userId={user.userData.id}
                        refreshAdQueries={_getAdQueriesByUserId}
                    />
                </div>
            )}
        </Container>
    )
})

export default MainPage
