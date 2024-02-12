import React from 'react'
import { Avatar, AvatarBadge, Stack } from '@chakra-ui/react'

const AvatarStatus = ({ onlineStatus }) => {
    return (
        <Stack direction='row' spacing={4}>
            {
                onlineStatus === 'online' ?
                    (
                        <Avatar src='https://bit.ly/code-beast' size={'md'} >
                            <AvatarBadge borderColor='papayawhip' bg='green.500' boxSize='0.8em' />
                        </Avatar>
                    ) : (
                        <Avatar src='https://bit.ly/code-beast' size={'md'} >
                            <AvatarBadge borderColor='papayawhip' bg='gray.400' boxSize='0.8em' />
                        </Avatar>
                    )
            }
        </Stack>
    )
}

export default AvatarStatus