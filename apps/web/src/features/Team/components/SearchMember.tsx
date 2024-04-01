import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { IoSearchOutline } from "react-icons/io5";

export const SearchMemberInput = () => {
    return (
        <InputGroup className='mb-8'>
            <InputLeftElement pointerEvents='none'>
                <IoSearchOutline color='gray.300' />
            </InputLeftElement>
            <Input type='text' placeholder='Find members' />
        </InputGroup>
    )
}
