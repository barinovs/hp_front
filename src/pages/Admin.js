import {observer} from 'mobx-react-lite'
import React, {useState, useContext, useEffect} from 'react'
import {Button, Container, Tab, Table, Tabs} from 'react-bootstrap'
import CreateAdQuery from '../components/modals/CreateAdQuery'
import {getAllUsers} from '../http/userApi'
import {getAdQueriesByUserId, getAllAdQueries} from '../http/adQueryApi'
import {Context} from '..'

const Admin = observer(() => {
    const [adQueryVisible, setAdQueryVisible] = useState(false)
    const [key, setKey] = useState('users')
    let [users, setUsers] = useState([])
    let [adQueries, setAdQueries] = useState([])
    const {user} = useContext(Context)

    const _getAllUsers = async () => {
        let _users = await getAllUsers()
        setUsers(_users)
        console.log('users', users) //TODO убрать этот console.log
    }

    const _getAllAdQueries = async () => {
        let _adQueries = await getAllAdQueries()
        setAdQueries(_adQueries)
    }

    const _getAdQueriesByUserId = async (id) => {
        let _adQueries = await getAdQueriesByUserId(id)
        setAdQueries(_adQueries)
        console.log('_adQueries', _adQueries) //TODO убрать этот console.log
    }

    useEffect(() => {
        _getAllUsers()
    }, [])

    return (
        <Container className="d-flex flex-column mt-2 w-5">
            {user.isAdmin ? (
                <Tabs
                    id="admin-tab"
                    activeKey={key}
                    onSelect={(k) => {
                        setKey(k)
                        switch (k) {
                            case 'users':
                                _getAllUsers()
                                break
                            case 'adQueries':
                                _getAllAdQueries() //TODO поменять 1 на id юзера
                                break
                            default:
                                break
                        }
                    }}
                    className="mb-3"
                >
                    <Tab eventKey="users" title="Пользователи">
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>e-mail</th>
                                    <th>Админ</th>
                                    <th>Создан:</th>
                                    <th>Изменён:</th>
                                    <th>Роль</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => {
                                    return (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                {user.isAdmin ? 'Да' : 'Нет'}
                                            </td>
                                            <td>
                                                {new Date(
                                                    user.createdAt
                                                ).toLocaleDateString()}
                                            </td>
                                            <td>
                                                {new Date(
                                                    user.updatedAt
                                                ).toLocaleDateString()}
                                            </td>
                                            <td>{user.roleId}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="adQueries" title="Запросы">
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>url</th>
                                    <th>Описание</th>
                                    <th>Создан:</th>
                                    <th>Изменён:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {adQueries.map((adQuery) => {
                                    return (
                                        <tr key={adQuery.id}>
                                            <td>{adQuery.id}</td>
                                            <td>{adQuery.url}</td>
                                            <td>{adQuery.description}</td>
                                            <td>
                                                {new Date(
                                                    adQuery.createdAt
                                                ).toLocaleDateString()}
                                            </td>
                                            <td>
                                                {new Date(
                                                    adQuery.updatedAt
                                                ).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Tab>
                </Tabs>
            ) : (
                <h2>Нет доступа</h2>
            )}

            {/* <Button
                onClick={() => setAdQueryVisible(true)}
                variant={'outline-dark'}
            >
                Добавить запрос
            </Button>
            <CreateAdQuery
                show={adQueryVisible}
                onHide={() => setAdQueryVisible(false)}
            /> */}
        </Container>
    )
})

export default Admin
