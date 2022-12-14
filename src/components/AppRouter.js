import {observer} from 'mobx-react-lite'
import React, {useContext} from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import {Context} from '../index'
import {authRoutes, publicRoutes} from '../routes'
import {MAIN_ROUTE} from '../utils/consts'

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    console.log('user.isAuth', user.isAuth)
    return (
        <Switch>
            {user.isAuth &&
                authRoutes.map(({path, Component}) => (
                    <Route exact key={path} path={path} component={Component} />
                ))}
            {publicRoutes.map(({path, Component}) => (
                <Route exact key={path} path={path} component={Component} />
            ))}
            {/* <Redirect to={MAIN_ROUTE} /> */}
        </Switch>
    )
})

export default AppRouter
