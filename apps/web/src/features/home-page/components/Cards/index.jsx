import { useEffect } from "react"
import Navbar from "../../../../shared/components/Navbar/Navbar"
import { useLogoutMutation } from "../../../authentication/redux/apiSlice/authApiSlice"
import Card from "./Card/Card"
import { CardInfo } from "./CardInfo/CardInfo"
import { useNavigate } from 'react-router'
import { userSelector } from "../../../authentication/redux/slices/userSlice"
import { useSelector } from 'react-redux';

const Cards = () => {
    const navigateTo = useNavigate();
    const user = useSelector(userSelector);
    console.log({ user })

    const [logOut, {
        isError,
        error,
        isSuccess
    }] = useLogoutMutation();

    // useEffect(() => {
    //     console.log('Effect ran in dashboard')
    //     navigateTo('/onboarding')
    //     setTimeout(() => {
    //         navigateTo('/dashboard')
    //     }, 10000)
    // }, []);

    return (
        <>
            <Navbar />

            <h2 onClick={() => navigateTo('/auth/login')}>Login</h2>

            <h2 onClick={logOut}>LogOut</h2>

            <div className="flex justify-center items-center">
                <div className='flex max-w-3xl flex-wrap justify-start  items-center pt-8 w-full'>
                    {CardInfo.map(({ title, description, ...props }) => (
                        <Card title={title} description={description} {...props} />
                    ))}
                </div>
            </div>

        </>
    )
}

export default Cards