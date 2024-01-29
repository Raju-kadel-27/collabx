import { Card } from './Card';
import { IoMdNotificationsOutline } from "react-icons/io"

export default function ActivityPage() {
    return (
        <div className='h-screen'>
            <div className='h-10 flex justify-center bg-black'>
                <div className='flex items-center justify-center'>
                    <IoMdNotificationsOutline color='gray' size={28} />
                    <p className='font-bold px-4 text-gray-300 text-lg  p-1'>
                        Notifications
                    </p>
                </div>
            </div>
            <div className='p-6 h-full overflow-y-auto overflow-x-hidden'>
                <Card bgColor='bg-yellow-100' />
                <Card bgColor='sd' />
                <Card bgColor='bg-green-100' />
                <Card bgColor='23' />
                <Card bgColor='bg-red-100' />
                <Card bgColor='bg-yellow-100' />
                <Card bgColor='sd' />
                <Card bgColor='bg-green-100' />
                <Card bgColor='23' />
                <Card bgColor='bg-red-100' />
                <Card bgColor='bg-yellow-100' />
                <Card bgColor='sd' />
                <Card bgColor='bg-green-100' />
                <Card bgColor='23' />
                <Card bgColor='bg-red-100' />
            </div>
        </div>

    )
}
