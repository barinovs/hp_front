import React from 'react'
import {Table} from 'react-bootstrap'

const AdQueriesTable = ({arr}) => {
    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>url</th>
                    <th>Описание</th>
                    <th>Создан:</th>
                    <th>Изменён:</th>
                    <th>Пользователь:</th>
                </tr>
            </thead>
            <tbody>
                {arr.map((adQuery) => {
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
                            <td>{adQuery?.user?.email}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default AdQueriesTable
