import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel
} from '@chakra-ui/react';
import { IoMdAdd } from "react-icons/io";

const Example = () => {
    return (
        <p className='bg-red-400 h-20'>
            Hello Name
        </p>
    )
}

export const TabsRow = () => {
    return (
        <Tabs>

            <TabList>
                <Tab>About</Tab>
                <Tab>Members</Tab>
                <Tab>Integrations</Tab>
                <Tab>Settingd</Tab>
                <IoMdAdd
                    className='hover:text-blue-600 cursor-pointer mx-2 mt-[10px]'
                    size={20} />
            </TabList>

            <TabPanels>

                <TabPanel>
                    <Example />
                </TabPanel>

                <TabPanel>
                    <Example />
                </TabPanel>

                <TabPanel>
                    <Example />
                </TabPanel>

                <TabPanel>
                    <Example />
                </TabPanel>

            </TabPanels>
        </Tabs>
    )
}

