import {makeAutoObservable} from 'mobx'

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._isAdmin = false
        this._userData = {}
        this._id = 0
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setIsAdmin(bool) {
        this._isAdmin = bool
    }

    setUserData(userData) {
        this._userData = userData
    }

    setId(id) {
        this._id = id
    }

    get isAuth() {
        return this._isAuth
    }

    get isAdmin() {
        return this._isAdmin
    }

    get userData() {
        return this._userData
    }

    get id() {
        return this._id
    }
}
