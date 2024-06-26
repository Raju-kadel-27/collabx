import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

const List = () => {
    return (
        <Tabs size='md' variant='enclosed'>
            <TabList>
                <Tab>One</Tab>
                <Tab>Two</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <p>one!</p>
                </TabPanel>
                <TabPanel>
                    <p>two!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default List

