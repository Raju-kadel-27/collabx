import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { selectAccessToken } from '../redux/slices/userSlice';
type Decoded = {
    userName: string;
    roles: string[];
}
export const useAuth = () => {
    const jwtToken = useSelector(selectAccessToken);
    let isAdmin = false;
    let isEditor = false;
    let status = 'user';

    if (jwtToken) {
        const decoded: Decoded = jwtDecode(jwtToken);
        const { userName, roles } = decoded;
        console.log({decoded});

        isEditor = roles?.includes('editor');
        isAdmin = roles?.includes('Admin');

        if (isEditor) status = 'editor'
        if (isAdmin) status = 'admin'

        return { isAdmin, isEditor, status, userName, roles, jwtToken };
    }
    return { isAdmin, isEditor, status, userName: '', roles: [], jwtToken };
}
