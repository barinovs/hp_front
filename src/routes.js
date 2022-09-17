import AdItem from './pages/AdItem'
import Admin from './pages/Admin'
import AdQueryPage from './pages/AdQueryPage'
import Auth from './pages/Auth'
import MainPage from './pages/MainPage'
import UserProfile from './pages/UserProfile'
import {
    ADMIN_ROUTE,
    AD_ITEM_ROUTE,
    AD_QUERY_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    REGISTRATION_ROUTE,
    USER_PROFILE_ROUTE,
} from './utils/consts'

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin,
    },
    {
        path: AD_QUERY_ROUTE,
        Component: AdQueryPage,
    },
    {
        path: AD_ITEM_ROUTE,
        Component: AdItem,
    },
    {
        path: USER_PROFILE_ROUTE,
        Component: UserProfile,
    },
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage,
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth,
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth,
    },
]
