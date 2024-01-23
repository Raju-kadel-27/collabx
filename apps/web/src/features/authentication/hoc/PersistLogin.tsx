import { useEffect, useRef, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../redux/slices/userSlice';
import PulseLoader from 'react-spinners/PulseLoader'
import { usePersist } from '../hooks/usePersist';
import { useRefreshTokenMutation } from '../redux/apis/authApiSlice';
import { useLocation } from "react-router-dom";

export const PersistLogin = () => {
    const location = useLocation()
    const navigateTo = useNavigate();
    const [persist] = usePersist();
    const accessToken = useSelector(selectAccessToken);
    const [success, setSuccess] = useState(false);
    const effectRan = useRef(false);

    const [refreshToken, {
        isUninitialized,
        isSuccess,
        isLoading,
        isError,
        error,
    }] = useRefreshTokenMutation();

    // console.log('************************ Triggered-persist')

    useEffect(() => {

        // React strict-mode causes useEffect to run twice during development
        // if (effectRan.current || process.env.NODE_ENV !== 'development') {

        const verifyRefreshToken = async () => {
            // console.log('verifyRefreshToken(()) called')
            try {
                // console.log('verifyRefreshToken(()) called')

                await refreshToken();
                setSuccess(true);
            } catch (error) {
                localStorage.removeItem('isUser');
                navigateTo('/auth/login')
                console.log(error)
            }
        }

        if (!accessToken && persist) verifyRefreshToken();

        // }

        return () => effectRan.current = true
    }, [])

    let content;
    if (isLoading) content = <PulseLoader color='blue' />
    if(!accessToken) content = <Navigate to="/auth/login" state={{ from: location }} replace />
    if (!persist && accessToken) content = <Outlet />
    if (persist && accessToken) content = <Outlet />
    if (isError) {
        localStorage.removeItem('isUser')
        content = <Navigate to="/auth/login" state={{ from: location }} replace />
        // content = (
        //     <p className='errmsg'>
        //         {`${error?.data?.message} - `}
        //         <Link to="/auth/login">Please login again</Link>.
        //     </p>
        // )
    }

    if (isSuccess && success) content = <Outlet />
    if (isUninitialized && accessToken) content = <Outlet />

    return content;
}

