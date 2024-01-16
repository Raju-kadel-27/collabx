import { AiOutlineDelete } from 'react-icons/ai'
import { MdOutlineEmail } from 'react-icons/md'
import {
    ,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    Caption,
    Container,
    Avatar,
} from '@chakra-ui/react'

export const Team = ({ selectedMembers }) => {
    return (

        <Container>
            < variant='simple'>

                <Tbody >
                    <Tr bg={'red.50'}>
                        <Td>
                            <div className='flex justify-start space-x-2 items-center'>
                                <Avatar colorScheme='orange' bg={'black'} size={'sm'} name='R' />
                                <p>Shishir Ghimire</p>
                            </div>
                        </Td>
                        <Td >
                            <div className='flex justify-start space-x-3 '>
                                <MdOutlineEmail color='black' size={20} />
                                <span>Ramshish@gmail.com</span>
                            </div>
                        </Td>
                        <Td >
                            <div className='flex justify-start space-x-3 hover:text-red-600 hover:cursor-pointer'>
                                <AiOutlineDelete size={20} />
                                <span>Delete</span>
                            </div>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>
                            <div className='flex justify-start space-x-2 items-center'>
                                <Avatar colorScheme='orange' bg={'black'} size={'sm'} name='R' />
                                <p>Shishir Ghimire</p>
                            </div>
                        </Td>
                        <Td >
                            <div className='flex justify-start space-x-3 '>
                                <MdOutlineEmail color='black' size={20} />
                                <span>Ramshish@gmail.com</span>
                            </div>
                        </Td>
                        <Td >
                            <div className='flex justify-start space-x-3 hover:text-red-500 hover:cursor-pointer'>
                                <AiOutlineDelete size={20} />
                                <span>Delete</span>
                            </div>
                        </Td>
                    </Tr>
                    <Tr bg={'pink.50'}>

                        <Td>
                            <div className='flex justify-start space-x-2 items-center'>
                                <Avatar colorScheme='orange' bg={'black'} size={'sm'} name='R' />
                                <p>Shishir Ghimire</p>
                            </div>
                        </Td>
                        <Td >
                            <div className='flex justify-start space-x-3 '>
                                <MdOutlineEmail color='black' size={20} />
                                <span>Ramshish@gmail.com</span>
                            </div>
                        </Td>
                        
                        <Td >
                            <div className='flex justify-start space-x-3 hover:text-red-500 hover:cursor-pointer'>
                                <AiOutlineDelete size={20} />
                                <span>Delete</span>
                            </div>
                        </Td>
                    </Tr>
                </Tbody>

            </>
        </Container>
    )
}

