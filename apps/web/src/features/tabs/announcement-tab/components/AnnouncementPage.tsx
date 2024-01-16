import { useState } from 'react';
import { Card } from './Card';
import { ModalProvider } from '@/components/ui/modal';
import { UpdateAnnouncement } from './UpdateModalBody';

export const AnnouncementPage = () => {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <Card
                announcementContent='"Dear all, kindly note that our office will be closed on Friday, January 7th, for a company-wide event. We appreciate your understanding and look forward to resuming regular operations on Monday. Thank you."'
                date='December 04'
                day='Tuesday'
                priority={'high'}
                setOpen={setOpen}
            />
            <Card
                announcementContent='Important Notice: The scheduled maintenance activity is planned for tomorrow, from 10:00 AM to 2:00 PM. We apologize for any inconvenience this may cause and appreciate your cooperation during this time.'
                date='December 04'
                day='Tuesday'
                priority={'medium'}
                setOpen={setOpen}
            />
            <Card
                announcementContent='"Dear all, kindly note that our office will be closed on Friday, January 7th, for a company-wide event. We appreciate your understanding and look forward to resuming regular operations on Monday. Thank you."'
                date='December 04'
                day='Tuesday'
                priority={'low'}
                setOpen={setOpen}
            />

            <ModalProvider
                open={open}
                setOpen={setOpen}
                title='Announcement Info'
                size={''}
            >
               <UpdateAnnouncement/>

            </ModalProvider>
        </>
    )
}
