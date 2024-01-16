import {
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import { TeamTable } from '../Table/Table'
import { AiOutlineTeam } from 'react-icons/ai'


export const TeamAccordion = () => {
    return (
        <Accordion allowMultiple >
            <AccordionItem >
                <h2>
                    <AccordionButton  paddingLeft={'6'} paddingY={'4'}>
                        <Box as="span" flex='1' justifyContent={'center'} color={'gray.600'} fontWeight={'bold'} textAlign='left'>
                           <div className='w-full justify-start space-x-2 flex items-center'>
                           <AiOutlineTeam color='black' size={'32'}/>
                            <span className='text-gray-600'>Team Rising Nepal</span>
                           </div>

                        </Box>
                        <Box as="span" flex='1' fontWeight={'normal'} textAlign='left'>
                            Created At : <span className=' rounded-full font-normal px-2 bg-cyan-200'> 16th May, 2024</span>
                        </Box>
                        <Box as="span" flex='1' fontWeight={'normal'} textAlign='left'>
                            Members : <span className=' px-3 mx-1 font-normal rounded-full bg-red-200'> 16</span>
                        </Box>
                        {/* <Box as="span" flex='1' fontWeight={'medium'} textAlign='left'>
                             <span onClick={()=>''} className='hover:cursor-pointer px-3 p-2 mx-1 rounded-lg bg-gray-700 text-slate-100' >Add New</span>
                        </Box> */}
                        <AccordionIcon />
                    </AccordionButton>
                </h2>

                <AccordionPanel pb={4}>
                    <TeamTable />
                </AccordionPanel>

            </AccordionItem>
        </Accordion>
    )
}
