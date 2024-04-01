import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

const TabsNavigator = () => {
    return (
        // <div className='w-[60vw] bg-red-100 flex mt-40 justify-center items-center'>
        <Tabs height={'7xl'} marginLeft={'auto'} marginRight={'auto'} marginTop={'48'} isFitted maxWidth={'container.md'}>
            <TabList >
                <Tab>Discussion</Tab>
                <Tab>Files</Tab>
                <Tab>Recordings</Tab>
            </TabList>

            <TabPanels height={'full'}>
                <TabPanel height={'full'}>
                    <div className='bg-slate-50 h-96 '>one!</div>
                    <div className='bg-slate-50 h-96 '>one!</div>
                    <div className='bg-slate-50 h-96 '>one!</div>
                    <div className='bg-slate-50 h-96 '>one!</div>
                </TabPanel>

                <TabPanel>
                    <p>two!</p>
                </TabPanel>

                <TabPanel>
                    <p>three!</p>
                </TabPanel>

            </TabPanels>
        </Tabs>
        // </div>
    )
}

export default TabsNavigator