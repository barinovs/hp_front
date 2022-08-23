import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import {authRoutes, publicRoutes} from '../routes'
import {MAIN_ROUTE} from '../utils/consts'

const AppRouter = () => {
    const isAuth = false
    return (
        <Switch>
            {isAuth &&
                authRoutes.map(({path, Component}) => (
                    <Route exact key={path} path={path} component={Component} />
                ))}
            {publicRoutes.map(({path, Component}) => (
                <Route key={path} path={path} component={Component} />
            ))}
            <Redirect to={MAIN_ROUTE} />
        </Switch>
    )
}

export default AppRouter
