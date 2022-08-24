import {observer} from 'mobx-react-lite'
import React, {useContext} from 'react'
import {Navbar, Nav, Container, Button} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import {Context} from '..'
import {MAIN_ROUTE} from '../utils/consts'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: 'white'}} to={MAIN_ROUTE}>
                    HumilePretium
                </NavLink>

                {user.isAuth ? (
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant="outline-light">Админ-панель</Button>
                        <Button variant="outline-light" className="ms-2">
                            Выйти
                        </Button>
                    </Nav>
                ) : (
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button
                            variant="outline-light"
                            onClick={() => user.setIsAuth(true)}
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
