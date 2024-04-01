import {
    Avatar,
    Badge,
    CircularProgress,
    CircularProgressLabel,
    Skeleton,
    useToast
} from '@chakra-ui/react';
import React,
{
    SetStateAction,
    useEffect,
    useRef,
    useState
} from "react";
import { PopoverProvider } from "@/components/ui/popover";
import { TableHeadings } from "./TableHeadings"
import { IoEllipsisVertical } from 'react-icons/io5'
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineUpdate } from "react-icons/md";
import { useDeleteTaskMutation, useGetAllTasksQuery } from "../redux/apis/TaskApiSlice";
import { BiLoader } from "react-icons/bi";
import { useParams } from "react-router";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

enum Priority {
    HIGH = "High",
    MEDIUM = 'Medium',
    LOW = "Low"
}

enum Status {
    TODO = 'To Do',
    INPROGRESS = 'In Progress',
    DONE = 'Done',
    HOLD = 'Hold'
}

enum ModalType {
    CREATE = 'create',
    UPDATE = 'update'
}

type TableProps = {
    setModalType: React.Dispatch<SetStateAction<
        ModalType.CREATE |
        ModalType.UPDATE |
        ''
    >>;
    setOpen: React.Dispatch<SetStateAction<boolean>>
}

const StatusProvider = ({ type }: { type: string }) => {
    switch (type) {
        case Status.INPROGRESS:
            return <Badge textColor={'black'} colorScheme='yellow'>{Status.INPROGRESS}</Badge>
        case Status.DONE:
            return <Badge textColor={'black'} colorScheme='green'>{Status.DONE}</Badge>
        case Status.HOLD:
            return <Badge textColor={'black'} colorScheme='gray'>{Status.HOLD}</Badge>
        case Status.TODO:
            return <Badge textColor={'black'} colorScheme='cyan'>{Status.TODO}</Badge>
    }
}

const PriorityProvider =
    ({ type }: { type: string }) => {
        switch (type) {
            case Priority.LOW:
                return <Badge textColor={'black'} className="text-sm " colorScheme='yellow'>{Priority.LOW}</Badge>
            case Priority.MEDIUM:
                return <Badge textColor={'black'} className="text-sm " colorScheme='orange'>{Priority.MEDIUM}</Badge>
            case Priority.HIGH:
                return <Badge textColor={'black'} className="text-sm " colorScheme='red'>{Priority.HIGH}</Badge>
        }
    }

const ProgressProvider =
    ({ percent }: { percent: number }
    ) => {
        return (
            <>
                <CircularProgress
                    value={percent}
                    color='green.400'>
                    <CircularProgressLabel>
                        {percent}%
                    </CircularProgressLabel>
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

export const Table = React.forwardRef((
    { setModalType, setOpen }: TableProps,
    ref: any
) => {
    let effectRan = useRef(false);

    const prevPageStartCursor = useRef(0);
    const currPageStartCursor = useRef(0);
    const currPageEndCursor = useRef(0);

    const { teamId, channelId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [limit, _setLimit] = useState<any>(5);
    const [currentPage, setCurrentPage] = useState(searchParams.get('currentPage') || 1);
    const {
        data,
        isLoading,
        isError,
    } = useGetAllTasksQuery({
        channelId,
        limit: searchParams.get('limit') || 5,
        cursor: searchParams.get('cursor') || 0
    }, {
        refetchOnFocus: true,
        skip: !channelId || !teamId || !limit
    });


    useEffect(() => {
        if (
            data?.length &&
            currPageEndCursor.current != data[data.length - 1]['_id'] &&
            currPageStartCursor != data[0]['_id']
        ) {
            currPageStartCursor.current = data[0]['_id'];
            currPageEndCursor.current = data[data.length - 1]['_id'];

        }
    }, [data])

    useEffect(() => {
        setTimeout(() => {
            if (currPageStartCursor.current) {
                setSearchParams({ limit, cursor: currPageStartCursor.current, currentPage: 1 });
            }
        }, 300)
    }, [])

    console.log('####################');
    console.log({ data });
    console.log('####################');

    const handlePreviousPage = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log('handlePreviousPage is pressed')
        setSearchParams({
            limit,
            cursor: prevPageStartCursor.current,
            currentPage: (+searchParams.get('currentPage')) > 1 ? (+searchParams.get('currentPage') - 1) : 1
        })
    }

    // const handlePageLimit = () => {
    //     // setSearchParams({ limit })
    // }

    const handleNextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log('handleNextPage is pressed')
        if (currentPage == '1') {
            prevPageStartCursor.current = data[0]['_id'];
        }
        else {
            prevPageStartCursor.current = currPageStartCursor.current;
        }
        // set current-page end cursor in search params
        setSearchParams({ limit, cursor: currPageEndCursor.current });
    };

    const handleModalType = (type: string) => {
        if (type === ModalType.CREATE) {
            setOpen(prev => !prev);
            setModalType(ModalType.CREATE);
        }
    };

    if (isLoading) {
        return (<div className="flex flex-col space-y-5 ">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
        </div>)
    };

    if (!isLoading && isError) {
        return (
            <div>
                <p className="text-red-400 font-semibold">Some error occured.</p>
                <p className="text-slate-500 text-sm">Better luck next time.</p>
            </div>
        )
    }

    return (
        <main className="bg-white p-4 mt-[-15px] max-h-full rounded-md w-full">
            <section className=" flex items-center justify-between pb-2">
                <div>
                    <h2 className="text-gray-900 font-semibold"></h2>
                    <span className="text-xs text-black">Collabx Official</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex bg-gray-100 items-center p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd" />
                        </svg>
                        <input className="bg-gray-100 font-lato outline-none ml-1 block " type="text" name="" id="" placeholder="search..." />
                    </div>
                    <div className="lg:ml-40 ml-10 space-x-8">
                        <button
                            onClick={() => handleModalType(ModalType.CREATE)}
                            className="bg-black px-4 py-2 rounded-none text-white font-semibold tracking-wide cursor-pointer">
                            New Task
                        </button>
                    </div>
                </div>
            </section>
            <section className="h-[65vh] overflow-y-auto overflow-x-hidden">
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-2 overflow-x-auto">
                    <div className="inline-block min-w-full overflow-y-auto shadow rounded-lg">
                        <table className="min-w-full w-full overflow-x-auto leading-normal">
                            <TableHeader />
                            <TableBody
                                ref={ref}
                                data={data}
                                setModalType={setModalType}
                                setOpen={setOpen}
                            />
                        </table>
                    </div>
                </div>
            </section>
            <section>
                <div
                    className="px-1 py-2 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                    <span className="text-xs xs:text-sm font-lato text-gray-900">
                        Showing
                        <strong className="px-1">1</strong>
                        to
                        <strong className="px-1">4</strong>
                        of
                        <strong className="px-1">50</strong>
                        Entries
                    </span>
                    <div className="inline-flex mt-2 xs:mt-0">
                        <button
                            // disabled={parseInt(currentPage) === 1}
                            onClick={handlePreviousPage}
                            className="text-sm flex justify-center items-center text-indigo-50 transition duration-150 hover:bg-gray-800 bg-black font-semibold py-1 px-2 rounded-l">
                            <FaChevronLeft />
                            Prev
                        </button>
                        &nbsp; &nbsp;
                        <button
                            // disabled={parseInt(currentPage) === 5}
                            onClick={handleNextPage}
                            className="text-sm flex justify-center items-center text-indigo-50 transition duration-150 hover:bg-gray-800 bg-black font-semibold py-2 px-2 rounded-r">
                            Next
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            </section>
        </main>
    )
})

const TableBody = React.forwardRef((
    { setModalType, setOpen, data }:
        {
            setModalType: any;
            setOpen: React.Dispatch<SetStateAction<boolean>>;
            data: any
        },
    ref: any
) => {


    const toast = useToast();

    const [deleteTask, {
        isLoading: isDeleteLoading,
        isError: isDeleteError,
        error: deleteError
    }] = useDeleteTaskMutation()


    const handleModalType = (
        type: string,
        selectedTask: any
    ) => {
        if (type === ModalType.UPDATE) {
            ref.current = selectedTask;
            setOpen(prev => !prev);
            setModalType(ModalType.UPDATE)
        }
    }

    const handleDeleteTask = async (taskId: string) => {
        try {
            if (taskId) {

                const response = await deleteTask({ taskId })

                console.log({ response });

                if (
                    !response?.data?.length
                    || isDeleteError
                    || deleteError
                ) {
                    toast({
                        title: 'Failed deleting task',
                        description: "Something went wrong",
                        status: 'error',
                        duration: 7000,
                        isClosable: true,
                    })
                }
            }

        } catch (error) {
            console.log({ error })
            toast({
                title: 'Failed deleting task',
                description: "Something went wrong",
                status: 'error',
                duration: 7000,
                isClosable: true,
            })
        }
    }

    return (
        <>
            {data?.length > 1 &&
                data?.map(({
                    _id,
                    title,
                    projectName,
                    startDate,
                    endDate,
                    status,
                    priority,
                    progress,
                    assignees,
                    channelId
                }): any => (
                    <tbody>
                        <tr>
                            <td className="px-1 py-2 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">

                                    <div className="ml-3">
                                        <p className="text-gray-900 font-lato text-xs whitespace-no-wrap">
                                            <span className="mr-1 text-red-500">#</span>
                                            {title}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-1 pl-4 py-2 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap text-xs">
                                    {projectName}
                                </p>
                            </td>
                            <td className="px-1 py-2 pl-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap text-xs">
                                    {new Date(startDate).toLocaleDateString()}
                                </p>
                            </td>

                            <td className="px-1 py-2 pl-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap text-xs">
                                    {new Date(endDate).toLocaleDateString()}
                                </p>
                            </td>
                            <td className="px-1 py-2 pl-4 border-b border-gray-200 bg-white text-sm rounded-full">
                                <PriorityProvider type={priority} />
                            </td>
                            <td className="px-1 py-2 pl-4 border-b border-gray-200 bg-white text-sm rounded-full">
                                <StatusProvider type={status} />
                            </td>
                            <td className=" py-2 border-b border-gray-200 bg-white text-sm">

                                <div className="text-gray-900 flex justify-center items-center  whitespace-no-wrap">
                                    {
                                        assignees?.map(({ name, pic }:
                                            { name: string; pic: string }
                                        ) => (
                                            <Avatar size={'sm'} name={name} src={'https://bit.ly/ryan-florence'} />
                                        ))
                                    }
                                </div>
                            </td>
                            <td className="px-1 pl-4 py-2 border-b border-gray-200 bg-white text-sm">
                                <div
                                    className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                    <ProgressProvider
                                        percent={+progress}
                                    />
                                </div>
                            </td>

                            <td className="pl-12 py-5 border-b border-gray-200 bg-white text-sm">
                                <PopoverProvider
                                    triggerer={<IoEllipsisVertical size={18} />}
                                >
                                    <div onClick={() => handleModalType(
                                        ModalType.UPDATE,
                                        {
                                            _id,
                                            title,
                                            projectName,
                                            startDate,
                                            endDate,
                                            status,
                                            priority,
                                            progress,
                                            assignees,
                                            channelId
                                        }
                                    )}

                                        className="flex items-center space-x-2 py-1 px-2 hover:bg-gray-100 hover:cursor-pointer">
                                        <MdOutlineUpdate size={20} className='mx-3' />
                                        Update
                                    </div>

                                    <div
                                        onClick={() => handleDeleteTask(_id)}
                                        className="flex items-center space-x-2 py-1 px-2 hover:bg-gray-100 hover:cursor-pointer">
                                        {isDeleteLoading ?
                                            <BiLoader /> :
                                            <RiDeleteBin6Line size={20} className='mx-3' />
                                        }
                                        Delete
                                    </div>

                                </PopoverProvider>
                            </td>
                        </tr>
                    </tbody>
                ))

            }


        </>
    )
})
