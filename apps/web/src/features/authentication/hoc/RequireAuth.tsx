import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation()
    const { roles } = useAuth()

    console.log('************************ Triggered-require-auth')

    const content = (
        roles?.some(role => allowedRoles?.includes(role))
            ? <Outlet />
            : <Navigate to="/auth/login" state={{ from: location }} replace />
    )
    return content;
}