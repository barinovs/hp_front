import {observer} from 'mobx-react-lite'
import React, {useContext} from 'react'
import {Pagination} from 'react-bootstrap'
import {Context} from '../index'

const Pages = observer(() => {
    const {adQuery} = useContext(Context)
    const pagesCount = Math.ceil(adQuery.totalCount / adQuery.limit)
    const pages = Array.from(new Array(pagesCount), (x, n) => n + 1)
    return (
        <Pagination className="mt-p" variant="dark">
            {pages.map((page) => (
                <Pagination.Item
                    key={page}
                    active={adQuery.page === page}
                    onClick={() => adQuery.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            ))}
        </Pagination>
    )
})

export default Pages
