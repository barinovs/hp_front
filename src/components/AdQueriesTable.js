import {observer} from 'mobx-react-lite'
import React, {useContext, useState} from 'react'
import {Form, Table} from 'react-bootstrap'
import {Context} from '../index'
import {deleteAdQuery, setActive} from '../http/adQueryApi'
import DeleteAdQuery from './modals/DeleteAdQuery'

const AdQueriesTable = observer(({arr, refreshAdQueries}) => {
    const {user} = useContext(Context)

    const [showDeleteAdQueryModal, setShowDeleteAdQueryModal] = useState(false)
    const [adQueryIdForDelete, setAdQueryIdForDelete] = useState(0)
    const [adQueryDescrForDelete, setAdQueryDescrIdForDelete] = useState(0)

    const _setActive = async (data) => {
        await setActive(data)
        await refreshAdQueries()
    }

    const _deleteAdQuery = async () => {
        await deleteAdQuery({
            adQueryId: adQueryIdForDelete,
            userId: user.userData.id,
        })
        await refreshAdQueries()
        setShowDeleteAdQueryModal(false)
    }

    return (
        <div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        {/* <th>url</th> */}
                        <th>Описание</th>
                        <th>Создан:</th>
                        <th>Изменён:</th>
                        <th>Пользователь:</th>
                        <th>Активно:</th>
                    </tr>
                </thead>
                <tbody>
                    {arr.map((adQuery) => {
                        return (
                            <tr key={adQuery.id}>
                                <td>{adQuery.id}</td>
                                {/* <td>{adQuery.url}</td> */}
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
                                <td>{adQuery?.user?.email}</td>
                                <td>
                                    <div className="d-flex justify-content-center align-items-center mt-1">
                                        {/* <input
                                            checked={adQuery.isActive}
                                            type="checkbox"
                                            onChange={(e) => {
                                                _setActive({
                                                    userId: user.userData.id,
                                                    adQueryId: adQuery.id,
                                                    isActive: e.target.checked,
                                                })
                                            }}
                                        ></input> */}
                                        <Form.Check
                                            checked={adQuery.isActive}
                                            onChange={(e) => {
                                                _setActive({
                                                    userId: user.userData.id,
                                                    adQueryId: adQuery.id,
                                                    isActive: e.target.checked,
                                                })
                                            }}
                                        ></Form.Check>
                                    </div>
                                </td>
                                <td>
                                    <div className="d-flex justify-content-center align-items-center mt-1">
                                        <svg
                                            style={{cursor: 'pointer'}}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-trash"
                                            viewBox="0 0 16 16"
                                            onClick={() => {
                                                setShowDeleteAdQueryModal(true)
                                                setAdQueryIdForDelete(
                                                    adQuery.id
                                                )
                                                setAdQueryDescrIdForDelete(
                                                    adQuery.description
                                                )
                                            }}
                                        >
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path
                                                fill-rule="evenodd"
                                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                            />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <DeleteAdQuery
                show={showDeleteAdQueryModal}
                onHide={() => setShowDeleteAdQueryModal(false)}
                deleteAdQuery={() => _deleteAdQuery()}
                description={adQueryDescrForDelete}
            />
        </div>
    )
})

export default AdQueriesTable
