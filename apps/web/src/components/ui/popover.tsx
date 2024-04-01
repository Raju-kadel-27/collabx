import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    Button,
    Portal
} from '@chakra-ui/react'

interface PopoverProviderProps {
    triggerer: any,
    children: React.ReactNode
}

export const PopoverProvider = ({ triggerer, children }: PopoverProviderProps) => {
    return (
        <Popover>
            <PopoverTrigger>
                <Button
                    _hover={{ bg: 'transparent' }}
                    bg={'transparent'}
                    color={'gray'}
                    width={0.2}
                    leftIcon={triggerer}
                />
            </PopoverTrigger>
            <Portal >
                <PopoverContent zIndex={50} className='z-50 ml-[17vw] mb-20'>
                    <PopoverBody>
                        {children}
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>
    )
}