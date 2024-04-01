import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    SimpleGrid,
    Select,
    Textarea,
    useToast
} from '@chakra-ui/react';
import { useUpdateAnnouncementMutation } from '../../redux/apis/AnnouncementApiSlice';

export const UpdateAnnouncement = React.forwardRef((props, ref) => {

    const toast = useToast();

    const [updateAnnouncement, { isLoading }] = useUpdateAnnouncementMutation();

    const {
        handleSubmit,
        register,
        control,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<any>()

    const onSubmit = async (formData: any) => {
        try {

            console.log({ formData });

            console.log(ref.current._id, 'ref.current._id');

            let payload = {
                announcementId: ref.current._id,
                fieldsToUpdate: formData
            }

            const response = await updateAnnouncement(payload);

            console.log({ response });

            if (response?.data?._id) {
                toast({
                    title: 'Updated Successfully',
                    status: 'success',
                    duration: 6000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: 'Update Failed',
                    status: 'error',
                    duration: 6000,
                    isClosable: true,
                })
            }
        }
        catch (error) {
            console.log({ error })
            toast({
                title: 'Something went up.',
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
        }
    }


    useEffect(() => {

        console.log('inside update use-effect inside form now')

        console.log(ref.current._id, 'ref.current._id');

        setValue('_id', ref.current._id);

        setValue('title', ref.current.title);

        setValue('priority', ref.current.priority);

        setValue('content', ref.current.content);

    }, [])


    return (
        <form
            className='w-full'
            onSubmit={handleSubmit(onSubmit)}>

            <SimpleGrid className='w-full' columns={2} spacing={6}>

                <FormControl isInvalid={errors.name}>
                    <FormLabel htmlFor='title'>Title</FormLabel>
                    <Input
                        minWidth={48}
                        id='title'
                        placeholder='Title of announcement'
                        {...register('title', {
                            required: 'This is required',
                            minLength: { value: 10, message: 'Min length is 10' },
                            maxLength: { value: 100, message: 'Max length is 100' },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.name}>
                    <FormLabel htmlFor='name'>Priority</FormLabel>
                    <Select
                        defaultValue={ref.current.priority}
                        bg='gray.100'
                        placeholder='Select priority'>
                        <option value='high'>High</option>
                        <option value='medium'>Medium</option>
                        <option value='low'>Low</option>
                    </Select>
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
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