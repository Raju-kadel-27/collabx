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
    Textarea
} from '@chakra-ui/react';

export const UpdateAnnouncement = React.forwardRef((props, ref) => {

    console.log('***************** Update announcement rerendered *************');
    console.log(ref.current, 'announcementRef.current');

    const {
        handleSubmit,
        register,
        control,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<any>()

    function onSubmit() {
        console.log('onsubmit clicked now...')
        console.log({formState});
    }

    useEffect(() => {

        console.log('inside update use-effect inside form now')

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
                            minLength: { value: 4, message: 'Min length is 4' },
                            maxLength: { value: 20, message: 'Max length is 20' },
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
                        minLength: { value: 10, message: 'Min length is 4' },
                        maxLength: { value: 200, message: 'Max length is 200' },
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
                isLoading={isSubmitting}
                type='submit'>
                Submit
            </Button>

        </form>
    )
})