import { useForm } from 'react-hook-form'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    SimpleGrid,
    Select,
    CircularProgress,
    CircularProgressLabel
} from '@chakra-ui/react'
import { useState } from 'react'

export const UpdateTask = () => {

    const [progressValue, setProgressValue] = useState<number>(0)

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<any>()

    function onSubmit(values) {
        return new Promise((resolve) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                resolve()
            }, 3000)
        })
    }

    return (

        <form
            className='w-full'
            onSubmit={handleSubmit(onSubmit)}>

            <SimpleGrid className='w-full' columns={3} spacing={6}>

                <FormControl isInvalid={errors.name}>
                    <FormLabel htmlFor='name'>Title</FormLabel>
                    <Input
                        minWidth={48}
                        id='name'
                        placeholder='name'
                        {...register('name', {
                            required: 'This is required',
                            minLength: { value: 4, message: 'Minimum length should be 4' },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.name}>
                    <FormLabel htmlFor='name'>Project Name</FormLabel>
                    <Input
                        minWidth={48}
                        id='name'
                        placeholder='name'
                        {...register('name', {
                            required: 'This is required',
                            minLength: { value: 4, message: 'Minimum length should be 4' },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.name}>
                    <FormLabel htmlFor='name'>Assignees</FormLabel>
                    <Input
                        id='name'
                        minWidth={48}
                        placeholder='name'
                        {...register('name', {
                            required: 'This is required',
                            minLength: { value: 4, message: 'Minimum length should be 4' },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.name}>
                    <FormLabel htmlFor='name'>Start Date</FormLabel>
                    <Input
                        id='name'
                        minWidth={48}
                        placeholder='name'
                        type='date'
                        {...register('name', {
                            required: 'This is required',
                            minLength: { value: 4, message: 'Minimum length should be 4' },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.name}>
                    <FormLabel htmlFor='name'>End Date</FormLabel>
                    <Input
                        id='name'
                        minWidth={48}
                        placeholder='name'
                        type='date'
                        {...register('name', {
                            required: 'This is required',
                            minLength: { value: 4, message: 'Minimum length should be 4' },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.name}>
                    <FormLabel htmlFor='name'>Priority</FormLabel>
                    <Select bg='yellow.400' placeholder='Select priority'>
                        <option value='option1'>High</option>
                        <option value='option2'>Medium</option>
                        <option value='option3'>Low</option>
                    </Select>
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.name}>
                    <FormLabel htmlFor='name'>Status</FormLabel>
                    <Select w={36} bg='green.400' placeholder='Select status'>
                        <option value='option1'>To Do</option>
                        <option value='option2'>Pending</option>
                        <option value='option3'>Completed</option>
                    </Select>
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.name}>
                    <FormLabel htmlFor='name'>Progress</FormLabel>
                    <Input
                        id='name'
                        minWidth={36}
                        placeholder='name'
                        onChange={(e) => setProgressValue(e.target.value)}
                        {...register('name', {
                            required: 'This is required',
                            minLength: { value: 4, message: 'Minimum length should be 4' },
                        })}
                    />

                    <CircularProgress mt={2} value={progressValue} color='green.400'>
                        <CircularProgressLabel>{progressValue}%</CircularProgressLabel>
                    </CircularProgress>

                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>

                </FormControl>

            </SimpleGrid>

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
}