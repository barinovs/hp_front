import {makeAutoObservable} from 'mobx'

export default class AdQueriesStore {
    constructor() {
        this._page = 1
        this._totalCount = 0
        this._limit = 10
        makeAutoObservable(this)
    }

    setPage(page) {
        this._page = page
    }

    setTotalCount(count) {
        this._totalCount = count
    }

    setLimit(limit) {
        this._limit = limit
    }

    get page() {
        return this._page
    }

    get totalCount() {
        return this._totalCount
    }

    get limit() {
        return this._limit
    }
}
