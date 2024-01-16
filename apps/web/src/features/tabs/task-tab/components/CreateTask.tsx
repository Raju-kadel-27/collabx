import { useForm } from 'react-hook-form';
import { useState, ChangeEvent } from 'react'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    SimpleGrid,
    Select,
    CircularProgress,
    CircularProgressLabel,
    NumberInput,
    NumberInputField,
    NumberInputStepper
} from '@chakra-ui/react'

import {
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'

enum Status {
    TODO = 'To Do',
    PENDING = 'pending',
    COMPLETED = 'completed'
}

enum Priority {
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low'
}

const StatusColorProvider = (type: string) => {
    if (!type) return;

    switch (type) {
        case Status.TODO:
            return '#22d3ee';
        case Status.PENDING:
            return '#fbbf24';
        case Status.COMPLETED:
            return '#22c55e'
    }
}

const PriorityColorProvider = (type: string) => {
    if (!type) return;

    switch (type) {
        case Priority.HIGH:
            return '#f87171';
        case Priority.MEDIUM:
            return '#fbbf24';
        case Priority.LOW:
            return '#38bdf8'
    }
}

export const CreateTask = () => {

    const [progressPercent, setProgressPercent] = useState<number>(5)
    const [priority, setPriority] = useState<
        Priority.HIGH
        | Priority.MEDIUM
        | Priority.LOW
        | ''
    >('')

    const [status, setStatus] = useState<
        Status.COMPLETED
        | Status.PENDING
        | Status.TODO
        | ''
    >('')

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

    const handlePriority = (e: ChangeEvent<HTMLSelectElement>) => {
        setPriority(e.target.value)
    }

    const handleStatus = (e: ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value)
    }

    const handleProgress = (e: any) => {
        setProgressPercent(Number(e))
    }

    return (

        <form
            className='w-full'
            onSubmit={handleSubmit(onSubmit)}>

            <SimpleGrid className='w-full' columns={3} spacing={6}>

                <FormControl isInvalid={errors.name}>
                    <FormLabel htmlFor='title'>Title</FormLabel>
                    <Input
                        minWidth={48}
                        id='title'
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
                    <FormLabel htmlFor='project-name'>Project Name</FormLabel>
                    <Input
                        minWidth={48}
                        id='project-name'
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
                    <FormLabel htmlFor='assignees'>Assignees</FormLabel>
                    <Input
                        id='assignees'
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
                    <FormLabel htmlFor='start-date'>Start Date</FormLabel>
                    <Input
                        id='start-date'
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
                    <FormLabel htmlFor='end-date'>End Date</FormLabel>
                    <Input
                        id='end-date'
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
                    <FormLabel htmlFor='priority'>Priority</FormLabel>
                    <Select
                        id='priority'
                        onChange={handlePriority}
                        bg={PriorityColorProvider(priority)}
                        placeholder='Select priority'
                    >
                        <option value={Priority.HIGH}>High</option>
                        <option value={Priority.MEDIUM}>Medium</option>
                        <option value={Priority.LOW}>Low</option>

                    </Select>
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.name}>
                    <FormLabel htmlFor='status'>Status</FormLabel>
                    <Select
                        id='status'
                        onChange={handleStatus}
                        w={36}
                        bg={StatusColorProvider(status)}
                        placeholder='Select status'
                    >

                        <option value={Status.TODO}>To Do</option>
                        <option value={Status.PENDING}>Pending</option>
                        <option value={Status.COMPLETED}>Completed</option>
                    </Select>
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.progress}>
                    <FormLabel htmlFor='progress'>Progress</FormLabel>
                    <NumberInput
                        onChange={handleProgress}
                        defaultValue={progressPercent}
                        min={0}
                        max={100}>
                        <NumberInputField />
                        <NumberInputStepper>
                        </NumberInputStepper>
                    </NumberInput>
                    <CircularProgress mt={2} value={progressPercent} color='green.400'>
                        <CircularProgressLabel>{progressPercent || 0}%</CircularProgressLabel>
                    </CircularProgress>
                </FormControl>

            </SimpleGrid>

            <Button
                className=' absolute rounded-nonde mb-2  left-[40vw]'
                borderRadius={'initial'}
                mt={8}
                colorScheme='messenger'
                isLoading={isSubmitting}
                type='submit'
            >
                Submit
            </Button>

        </form>
    )
}