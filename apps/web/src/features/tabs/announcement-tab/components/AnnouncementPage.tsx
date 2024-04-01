import { useRef, useState } from 'react';
import { Card } from './Card';
import { ModalProvider } from '@/components/ui/modal';
import { Button, Skeleton } from '@chakra-ui/react';
import { BiPlus } from 'react-icons/bi';
import { CreateAnnouncement } from './modals/Create-Announcement';
import { UpdateAnnouncement } from './modals/Update-Announcement';
import { useGetAllAnnouncementQuery } from '../redux/apis/AnnouncementApiSlice';
import { useParams } from 'react-router';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function AnnouncementPage() {
    const { teamId, channelId } = useParams()
    console.log({ teamId, channelId });

    // let channelIdd = '658d454e9da782c94f04016f';
    const {
        data: announcements,
        isLoading,
        isError,
        error
    } = useGetAllAnnouncementQuery(channelId, {
        refetchOnFocus: true,
        skip: !channelId || !teamId
    });

    const [open, setOpen] = useState<boolean>(false);

    const [modalType, setModalType] = useState<string>('')

    const announcementRef = useRef([]);

    const handleAddButton = () => {
        setOpen((prev: boolean) => !prev);
        setModalType('create');
    }
    if (
        isLoading
    ) {
        return (
            <div className='flex flex-col space-y-4'>
                <Skeleton
                    height='40px'
                    fadeDuration={4}
                    bg='blue.500'
                    color='white'
                />
                <Skeleton
                    height='40px'
                    fadeDuration={4}
                    bg='blue.500'
                    color='white'
                />
                <Skeleton
                    height='40px'
                    fadeDuration={4}
                    bg='blue.500'
                    color='white'
                />
            </div>
        )
    }
    if (
        isError ||
        error
    ) {
        return (
            <p className='text-red-500'>Error occured. Please try again later.</p>
        )
    }
    return (
        <main className='h-screen'>
            <section>
                <div className='w-full flex justify-end'>
                    <Button
                        onClick={handleAddButton}
                        className='hover:cursor-pointer mr-2'
                        color={'white'}
                        bg={'black'}
                        colorScheme='black'
                        rightIcon={<BiPlus size={24} />}>
                        Add
                    </Button>
                </div>
            </section>

            <section className='h-[65vh] overflow-y-auto overflow-x-hidden'>
                {announcements &&
                    announcements?.map((item: any) => (
                        <Card
                            ref={announcementRef}
                            item={item}
                            setModalType={setModalType}
                            setOpen={setOpen} />
                    ))
                }
            </section>

            <section className='mt-auto h-full'>
                <TableFilters />
            </section>

            <ModalProvider
                open={open}
                setOpen={setOpen}
                title='announcements Management'
                size={''} >

                {modalType === 'create' &&
                    <CreateAnnouncement />
                }

                {modalType === 'update' &&
                    <UpdateAnnouncement
                        ref={announcementRef} />
                }

            </ModalProvider>
        </main>
    )
}

const TableFilters = () => {
    return (
        <>
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
                        className="text-sm flex justify-center items-center text-indigo-50 transition duration-150 hover:bg-gray-800 bg-black font-semibold py-1 px-2 rounded-l">
                        <FaChevronLeft />
                        Prev
                    </button>
                    &nbsp; &nbsp;
                    <button
                        className="text-sm flex justify-center items-center text-indigo-50 transition duration-150 hover:bg-gray-800 bg-black font-semibold py-2 px-2 rounded-r">
                        Next
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </>
    )
}
