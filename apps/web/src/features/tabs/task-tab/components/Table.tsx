import { PopoverProvider } from "@/components/ui/popover";
import { TableHeadings } from "./TableHeadings"
import { Avatar, Badge, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { IoEllipsisVertical } from 'react-icons/io5'
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineUpdate } from "react-icons/md";

const StatusProvider = ({ type }: { type: string }) => {
    switch (type) {
        case 'pending':
            return <Badge textColor={'black'} colorScheme='yellow'>Pending</Badge>
        case 'completed':
            return <Badge textColor={'black'} colorScheme='green'>Completed</Badge>
        case 'hold':
            return <Badge textColor={'black'} colorScheme='gray'>Hold</Badge>
        case 'todo':
            return <Badge textColor={'black'} colorScheme='cyan'>To Do</Badge>
    }
}

const PriorityProvider = ({ type }: { type: string }) => {
    switch (type) {
        case 'low':
            return <Badge textColor={'black'} className="text-sm " colorScheme='yellow'>Low</Badge>
        case 'medium':
            return <Badge textColor={'black'} className="text-sm " colorScheme='orange'>Medium</Badge>
        case 'high':
            return <Badge textColor={'black'} className="text-sm " colorScheme='red'>High</Badge>
    }
}

const ProgressProvider = ({ percent }: { percent: number }) => {
    return (
        <>
            <CircularProgress value={percent} color='green.400'>
                <CircularProgressLabel>{percent}%</CircularProgressLabel>
            </CircularProgress>
        </>
    )
}

const TableHeader = () => {
    return (
        <>
            <thead>
                <tr>
                    {
                        TableHeadings.map((heading: string) => (
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                {heading}
                            </th>
                        ))
                    }
                </tr>
            </thead>
        </>
    )
}



const TableBody = ({ setOpen }: any) => {

    const handleModalTrigger: React.MouseEventHandler<HTMLParagraphElement> = () => {
        setOpen((prev: boolean) => !prev)
    }

    return (
        <>
            <tbody>
                <tr>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">

                            <div className="ml-3">
                                <p className="text-gray-900 font-lato text-sm whitespace-no-wrap">
                                    # Add server side recording in video-chat app
                                </p>
                            </div>
                        </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            CollabX
                        </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            Dec 24, 2023
                        </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm rounded-full">
                        <PriorityProvider type={"high"} />
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm rounded-full">
                        <StatusProvider type={'pending'} />
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">

                        <div className="text-gray-900 flex justify-center items-center  whitespace-no-wrap">
                            <Avatar size={'sm'} name='Raju' src='https://bit.ly/dan-abramov' />
                            <Avatar size={'sm'} name='Himesh' src='https://bit.lyl/dan-abramov' />
                        </div>
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div
                            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <ProgressProvider
                                percent={88}
                            />
                        </div>
                    </td>

                    <td className="pl-12 py-5 border-b border-gray-200 bg-white text-sm">

                        <PopoverProvider
                            triggerer={<IoEllipsisVertical size={18} />}
                        >
                            <div
                                onClick={handleModalTrigger}
                                className="flex items-center space-x-2 py-1 px-2 hover:bg-gray-100 hover:cursor-pointer">
                                <MdOutlineUpdate size={20} className='mx-3' />
                                Update
                            </div>
                            <div
                                onClick={handleModalTrigger}
                                className="flex items-center space-x-2 py-1 px-2 hover:bg-gray-100 hover:cursor-pointer">
                                <RiDeleteBin6Line size={20} className='mx-3' />
                                Delete
                            </div>

                        </PopoverProvider>

                    </td>

                </tr>

            </tbody>
        </>
    )
}

const TableFilters = () => {
    return (
        <>
            <div
                className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                <span className="text-xs xs:text-sm text-gray-900">
                    Showing 1 to 4 of 50 Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                    <button
                        className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                        Prev
                    </button>
                    &nbsp; &nbsp;
                    <button
                        className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export const Table = ({ setOpen }: any) => {

    const handleModalTrigger: React.MouseEventHandler<HTMLButtonElement> = () => {
        setOpen((prev: boolean) => !prev)
    }

    return (
        <div className="bg-white p-4 mt-[-15px] rounded-md w-full">
            <div className=" flex items-center justify-between pb-2">
                <div>
                    <h2 className="text-gray-900 font-semibold">Task Management</h2>
                    <span className="text-xs text-black">From official</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex bg-gray-50 items-center p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd" />
                        </svg>
                        <input className="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search..." />
                    </div>

                    <div className="lg:ml-40 ml-10 space-x-8">
                        <button
                            onClick={handleModalTrigger}
                            className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                            Create New Task
                        </button>
                    </div>

                </div>
            </div>

            <div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-2 overflow-x-auto">
                    <div className="inline-block min-w-full overflow-y-auto shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <TableHeader />
                            <TableBody setOpen={setOpen} />
                            <TableBody setOpen={setOpen} />
                        </table>
                        {/* <TableFilters /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
