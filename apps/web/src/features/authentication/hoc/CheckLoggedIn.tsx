import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router'
import { selectAccessToken, userSelector } from '../redux/slices/userSlice';

export const CheckLoggedIn = () => {
    const location = useLocation();
    const accessToken = useSelector(selectAccessToken, (prev, next) => prev === next);

    let content;

    content = <Outlet />
    if (accessToken) content = <Navigate to='/dashboard' state={{ from: location }} replace />

    return (
        content
    )
}

