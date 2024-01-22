import React from 'react'
import { Outlet } from 'react-router'
import { Navigate, useLocation } from 'react-router'
import { useSelector } from 'react-redux'

const RequireAuth = () => {
    const { chatSystem: { user } } = useSelector(state => state.socket)
    const location = useLocation()

    let content;

    if (!user) content = <Navigate to='/auth' state={{ from: location }} replace />
    if (user) content = <Outlet />

    return (
        content
    )
}

export default RequireAuth;