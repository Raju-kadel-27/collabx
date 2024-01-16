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
// import { SearchMemberInput } from './SearchMember';
// import { AvatarWithUser } from './AvatarWithUser';
// import { AboutSection1, AboutSection2, AboutSection3 } from './ManageTeam/About';
// import { Settings } from './ManageTeam/Settings';

const Example = () => { return <p>xxx</p> }

const TabListWithPanels = [
    {
        tabName: "About",
        panel: <Example />,
        icon: <IoMdInformationCircleOutline className='mx-2' size={18} />

    },
    {
        tabName: "Members",
        panel: <Example />,
        icon: <HiUserGroup className='mx-2' size={18} />
    },
    {
        tabName: "Integrations",
        panel: <Example />,
        icon: <GrIntegration className='mx-2' size={18} />
    },
    {
        tabName: "Settings",
        panel: <Example />,
        icon: <IoSettingsOutline className='mx-2' size={18} />
    },
]

export const ManageChannel = () => {
    return (
        <Tabs colorScheme='purple'>

            <TabList>

                {TabListWithPanels.map(({ tabName, icon }) => (
                    <Tab className='font-lato'>
                        {icon}
                        {tabName}
                    </Tab>
                ))}

                <IoMdAdd
                    className='hover:text-blue-600 cursor-pointer mx-2 mt-[10px]'
                    size={20}
                />
            </TabList>

            <TabPanels>
                {TabListWithPanels.map(({ panel }) => (
                    <TabPanel>
                        {panel}
                    </TabPanel>
                ))}

            </TabPanels>

        </Tabs>
    )
}

