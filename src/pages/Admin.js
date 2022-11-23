import {observer} from 'mobx-react-lite'
import React, {useState, useContext, useEffect} from 'react'
import {Button, Container, Tab, Table, Tabs} from 'react-bootstrap'
import CreateAdQuery from '../components/modals/CreateAdQuery'
import {getAllUsers, setIsAdmin} from '../http/userApi'
import {getAdQueriesByUserId, getAllAdQueries} from '../http/adQueryApi'
import {Context} from '..'
import AdQueriesTable from '../components/AdQueriesTable'

const Admin = observer(() => {
    const [adQueryVisible, setAdQueryVisible] = useState(false)
    const [key, setKey] = useState('users')
    let [users, setUsers] = useState([])
    let [adQueries, setAdQueries] = useState([])
    const [isAdminChecked, setIsAdminChecked] = useState(false)
    const {user} = useContext(Context)
    const {adQuery} = useContext(Context)

    const _getAllUsers = async () => {
        let _users = await getAllUsers()
        setUsers(_users)
        console.log('users', users) //TODO убрать этот console.log
    }

    const refreshAdQueries = () => {
        _getAllAdQueries()
    }

    const _getAllAdQueries = async () => {
        let data = await getAllAdQueries(adQuery.page, adQuery.limit)
        setAdQueries(data.rows)
        adQuery.setTotalCount(data.count)
    }

    const handleSetIsAdmin = async (userId, isAdminValue) => {
        try {
            const res = await setIsAdmin(userId, isAdminValue)
            if (res.success) {
                users = users.map((item) => {
                    if (item.id === userId) {
                        item.isAdmin = isAdminValue
                    }
                    return item
                })
                setUsers(users)
                //alert(res.message)
            }
        } catch (e) {
            console.log('e ', e.response.data.message) //FIXME Удалить этот console.log()
            alert(e.response.data.message)
        }
    }

    useEffect(() => {
        _getAllUsers()
    }, [])

    useEffect(() => {
        _getAllAdQueries()
    }, [adQuery.page])

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
                                    <th>Телеграм</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((_user) => {
                                    return (
                                        <tr key={_user.id}>
                                            <td>{_user.id}</td>
                                            <td>{_user.email}</td>
                                            <td
                                                style={{
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <input
                                                    type="checkBox"
                                                    checked={_user.isAdmin}
                                                    // checked={user?.isAdmin}
                                                    onChange={(e) => {
                                                        handleSetIsAdmin(
                                                            _user.id,
                                                            e.target.checked
                                                        )
                                                    }}
                                                    style={{
                                                        margin: '0 auto',
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                {new Date(
                                                    _user.createdAt
                                                ).toLocaleDateString()}
                                            </td>
                                            <td>
                                                {new Date(
                                                    _user.updatedAt
                                                ).toLocaleDateString()}
                                            </td>
                                            <td>{_user.roleId}</td>
                                            <td>{_user.telegram_id}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="adQueries" title="Запросы">
                        <AdQueriesTable
                            arr={adQueries}
                            refreshAdQueries={refreshAdQueries}
                        />
                        <Button
                            onClick={() => setAdQueryVisible(true)}
                            variant={'outline-dark'}
                        >
                            Добавить запрос
                        </Button>
                    </Tab>
                </Tabs>
            ) : (
                <h2>Нет доступа</h2>
            )}

            <CreateAdQuery
                show={adQueryVisible}
                onHide={() => setAdQueryVisible(false)}
                forAdmin={true}
            />
        </Container>
    )
})

export default Admin
