import React, { useEffect, useState } from 'react'
import api from './api'
import { logout, getToken } from './auth'
import { Route, Redirect } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';

export default function WAuth({ component: Component, ...rest }) {

    const [redirect, setRedirect] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function verify() {
            const res = await api.get('/api/usuarios/checktoken', { params: { token: getToken() } })

            if (res.config.params.token === undefined || res.config.params.token === null) {
                setLoading(false)
                setRedirect(true)
            } else if (res.config.params.token === getToken()) {
                setLoading(false)
                setRedirect(false)
            } else {
                logout()
                setLoading(false)
                setRedirect(true)
            }
        }

        verify()
    }, [])

    return (
        loading ? <div style={{ position: "absolute", width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress /></div> : <Route {...rest}
            render={props => !redirect ? (
                <Component {...props} />
            ) : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            } />
    )
}