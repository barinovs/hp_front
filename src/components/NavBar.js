import {observer} from 'mobx-react-lite'
import React, {useContext} from 'react'
import {Navbar, Nav, Container, Button} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import {Context} from '..'
import {
    ADMIN_ROUTE,
    AD_QUERY_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
} from '../utils/consts'
import {useHistory} from 'react-router-dom'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()

    console.log('isAdmin', user.isAdmin)

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: 'white'}} to={MAIN_ROUTE}>
                    HumilePretium
                </NavLink>

                {user.isAuth ? (
                    <Nav
                        className="ml-auto d-flex align-items-center"
                        style={{color: 'white'}}
                    >
                        <div>Вы авторизованы как {user.user.email}</div>
                        {user.isAdmin && (
                            <Button
                                variant="outline-light"
                                onClick={() => history.push(ADMIN_ROUTE)}
                            >
                                Админ-панель
                            </Button>
                        )}

                        <Button
                            variant="outline-light"
                            className="ms-2"
                            onClick={() => {
                                // history.push(LOGIN_ROUTE)
                                logOut()
                            }}
                        >
                            Выйти
                        </Button>
                    </Nav>
                ) : (
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button
                            variant="outline-light"
                            onClick={() => history.push(LOGIN_ROUTE)}
                        >
                            Авторизация
                        </Button>
                    </Nav>
                )}
            </Container>
        </Navbar>
    )
})

export default NavBar
