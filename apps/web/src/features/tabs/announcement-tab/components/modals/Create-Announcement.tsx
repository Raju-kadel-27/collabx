import React from 'react';
import { Controller, useForm } from 'react-hook-form'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    SimpleGrid,
    Textarea,
    useToast
} from '@chakra-ui/react'
import { useCreateAnnouncementMutation } from '../../redux/apis/AnnouncementApiSlice';

enum Priority {
    High = 'high',
    Medium = 'medium',
    Low = 'low'
}

type OnsubmitProps = {
    content: string;
    priority: string;
    title: string;
}

type FormatDataProps = {
    channelId: string;
    priority: string;
    userId: string;
    title: string;
    content: string;
}

const FormatData = ({ channelId, priority, userId, title, content }: FormatDataProps) => {
    return {
        channelId: channelId,
        title: title,
        content: content,
        announcer: userId,
        priority: priority,
    }
}

export const CreateAnnouncement = React.forwardRef((props, ref) => {

    console.log({ ref });

    const toast = useToast();

    const [createAnnouncement, {
        isLoading,
        isError,
        error
    }] = useCreateAnnouncementMutation()

    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<any>()


    const onSubmit = async (data: OnsubmitProps) => {
        try {
            const { content, priority, title } = data;

            let userId = '658c2f62d2d12f120b0e2f94'
            let channelId = '658d454e9da782c94f04016f'

            const formatted = FormatData({ channelId, priority, userId, title, content })

            const response = await createAnnouncement(formatted);

            // console.log({ response })
            // console.log('******* Creating response data ********88')

            if (response?.data?._id) {
                toast({
                    title: 'Successfully announced !!',
                    description:"We hope people will be informed.",
                    status: 'success',
                    duration: 6000,
                    isClosable: true,
                })
            }
            if (isError && error) {
                console.log({ error })
                toast({
                    title: 'Something went wrong !!',
                    status: 'error',
                    duration: 6000,
                    isClosable: true,
                })
            }

        } catch (error) {
            console.log({ error })
        }
     }

    return (
        <form
            className='w-full'
            onSubmit={handleSubmit(onSubmit)}>

            <SimpleGrid className='w-full' alignItems={'center'} columns={2} spacing={6}>

                <FormControl isInvalid={errors.name}>
                    <FormLabel htmlFor='title'>Title</FormLabel>
                    <Input
                        minWidth={48}
                        id='title'
                        placeholder='Title of announcement'
                        {...register('title', {
                            required: 'This is required',
                            minLength: { value: 4, message: 'Min length is 4' },
                            maxLength: { value: 80, message: 'Max length is 80' },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl className='ml-3'>
                    <FormLabel htmlFor='priority'>Priority</FormLabel>
                    <Controller
                        name="priority"  // Name of the field in the form state
                        control={control}  // Control prop from useForm
                        defaultValue=""  // Default value for the select (can be an empty string or any other default value)
                        rules={{ required: 'Please select a priority' }}  // Validation rules
                        render={({ field }) => (
                            <select className='p-1 bg-gray-100' {...field}>
                                <option value="" disabled>Choose Priority</option>
                                <option value={Priority.High}>High</option>
                                <option value={Priority.Medium}>Medium</option>
                                <option value={Priority.Low}>Low</option>
                            </select>
                        )}
                    />
                    <p>{errors.priority && errors.priority.message}</p>
                </FormControl>

            </SimpleGrid>

            <FormControl className='' mt={4} isInvalid={errors.name}>
                <FormLabel htmlFor='name'>Content</FormLabel>
                <Textarea
                    placeholder='Type your announcement..'
                    size='sm'
                    {...register('content', {
                        required: 'This is required',
                        minLength: { value: 10, message: 'Min length is 10' },
                        maxLength: { value: 400, message: 'Max length is 400' },
                    })}
                />
                <FormErrorMessage>
                    {errors.name && errors.name.message}
                </FormErrorMessage>
            </FormControl>

            <Button
                className=' absolute rounded-nonde mb-2  left-[40vw]'
                borderRadius={'initial'}
                mt={8}
                colorScheme='messenger'
                isLoading={isLoading}
                type='submit'>
                Submit
            </Button>

        </form>
    )
})