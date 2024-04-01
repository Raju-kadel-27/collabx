import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel
} from '@chakra-ui/react';
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { GrIntegration } from "react-icons/gr";
import { HiUserGroup } from "react-icons/hi2";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { SearchMemberInput } from './SearchMember';
import { AvatarWithUser } from './AvatarWithUser';
import { AboutSection1 } from './ManageTeam/About';
import { Settings } from './ManageTeam/Settings';

export const ModalTabs = () => {
    return (
        <Tabs colorScheme='purple'>

            <TabList>
                <Tab className='font-lato'>
                    <IoMdInformationCircleOutline className='mx-2' size={18} />
                    About
                </Tab>
                <Tab>
                    <HiUserGroup className='mx-2' size={18} />
                    Members
                </Tab>
                <Tab>
                    <GrIntegration className='mx-2' size={18} />
                    Integrations</Tab>
                <Tab>
                    <IoSettingsOutline className='mx-2' size={18} />
                    Setting
                </Tab>
                <IoMdAdd
                    className='hover:text-blue-600 cursor-pointer mx-2 mt-[10px]'
                    size={20} />
            </TabList>

            <TabPanels height={'60vh'} className='h-full chakra- overflow-y-auto'>
                <TabPanel>
                    <AboutSection1 />
                </TabPanel>

                <TabPanel>
                    <SearchMemberInput />
                    <AvatarWithUser type='channel' name='Raju kadel' avatar='' />
                    <AvatarWithUser type='channel' name='Nilesh Niraula' avatar='' />
                </TabPanel>

                <TabPanel>
                    <Settings />
                </TabPanel>

                <TabPanel>
                    <Settings />
                </TabPanel>

            </TabPanels>

        </Tabs>
    )
}

