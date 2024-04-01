import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel
} from '@chakra-ui/react';
import React, { Suspense } from 'react';
import { IoMdAdd } from "react-icons/io";
import { Example2 } from '@/features/tabs/whiteboard-tab/components/Example2';
import { PulseLoader } from 'react-spinners';

const TaskTab = React.lazy(() => import('@/features/tabs/task-tab/components/TaskTab'))
const FilesTab = React.lazy(() => import('@features/tabs/file-tab/components/FilesTab'));
const ConversationLayout = React.lazy(() => import('@/features/tabs/post-tab/components'));
const AnnouncementPage = React.lazy(() => import('@/features/tabs/announcement-tab/components/AnnouncementPage'));
const PollingPage = React.lazy(() => import('@features/polling/components/page'));

const WithSuspense = (
    { children }:
        { children: React.ReactNode }
) => {
    return (
        <Suspense fallback={<PulseLoader color='red' size={20} />}>
            {children}
        </Suspense>
    )
}
const TabListWithPanels = [
    {
        tabName: 'Conversation',
        panel: <WithSuspense><ConversationLayout /></WithSuspense>
    },
    {
        tabName: 'Files',
        panel: <WithSuspense><FilesTab /></WithSuspense>
    },
    {
        tabName: 'Tasks',
        panel: <WithSuspense><TaskTab /></WithSuspense>
    },
    {
        tabName: 'MindMap',
        panel: <WithSuspense><Example2 /></WithSuspense>
    },
    {
        tabName: 'Announcement',
        panel: <WithSuspense><AnnouncementPage /></WithSuspense>
    },
    {
        tabName: 'Polling',
        panel: <WithSuspense><PollingPage /></WithSuspense>
    }
]

export const TabsRow = () => {
    return (
        <Tabs>
            <TabList>
                {TabListWithPanels.map(({ tabName }) =>
                    <Tab>{tabName}</Tab>
                )}
                <IoMdAdd
                    className='hover:text-blue-600 cursor-pointer mx-2 mt-[10px]'
                    size={20} />
            </TabList>
            <TabPanels>
                {TabListWithPanels.map(({ panel }) =>
                    <TabPanel>
                        {panel}
                    </TabPanel>
                )}
            </TabPanels>
        </Tabs>
    )
}

