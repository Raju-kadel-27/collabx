import { useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../redux/slices/userSlice';
import PulseLoader from 'react-spinners/PulseLoader'
import { usePersist } from '../hooks/usePersist';
import { useRefreshTokenMutation } from '../redux/apis/authApiSlice';

export const AuthGuard = () => {
    const navigateTo = useNavigate();
    const [persist] = usePersist();
    const accessToken = useSelector(selectAccessToken);
    const flag = useRef(false);

    const [refreshToken, {
        isUninitialized,
        isLoading,
    }] = useRefreshTokenMutation();

    console.log({isUninitialized,isLoading})

    useEffect(() => {
        const verifyRefreshToken = async () => {
            console.log('verifyRefreshToken(()) calledxxxx')
            try {
                console.log('verifyRefreshToken(()) calledxxx inside')
                await refreshToken();

            } catch (error) {
                // localStorage.removeItem('persist');
                navigateTo('/auth/login')
                console.log(error)
            }
            flag.current = true;
        }
        if (!accessToken && persist && !flag.current) verifyRefreshToken();
    }, [])

    let content = <Outlet />
    // if (isLoading) content = <PulseLoader color='blue' />

    return content;
}

