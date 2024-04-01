import { useToast } from '@chakra-ui/react'

const Toast = (
    {
        title,
        description,
        status,
        duration,
        isClosable
    }
) => {
    const toast = useToast()
    return (
        <Button
            onClick={() =>

                toast({
                    title,
                    description,
                    status,
                    duration,
                    isClosable,
                })
            }
        >
            Show Toast
        </Button>
    )
}