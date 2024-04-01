import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from '@chakra-ui/react';
import { IoChevronForward } from "react-icons/io5";
import { AiOutlineTeam } from "react-icons/ai";

export const Breadcrum = () => {
    return (
        <Breadcrumb
            fontSize={'sm'}
            spacing='3px'
            separator={<IoChevronForward color='gray.100' />}>

            <BreadcrumbItem>
                <BreadcrumbLink className='flex items-center' href='#'>
                    <AiOutlineTeam size={17} className='mx-1' />
                    Microsoft Team
                </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
                <BreadcrumbLink href='#'>
                    General
                </BreadcrumbLink>
            </BreadcrumbItem>

        </Breadcrumb>
    );
}
