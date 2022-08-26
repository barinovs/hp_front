import React, {useState} from 'react'
import {Button, Container} from 'react-bootstrap'
import CreateAdQuery from '../components/modals/CreateAdQuery'

const Admin = () => {
    const [adQueryVisible, setAdQueryVisible] = useState(false)
    return (
        <Container className="d-flex flex-column mt-2 w-5">
            <Button
                onClick={() => setAdQueryVisible(true)}
                variant={'outline-dark'}
            >
                Добавить запрос
            </Button>
            <CreateAdQuery
                show={adQueryVisible}
                onHide={() => setAdQueryVisible(false)}
            />
        </Container>
    )
}

export default Admin
