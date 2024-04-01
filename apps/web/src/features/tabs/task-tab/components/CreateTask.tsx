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
    NumberInputStepper,
    useToast,
    Tag,
    TagLabel,
    Avatar,
    Text,
    Popover,
    PopoverTrigger,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverContent,
    PopoverBody,
    Spinner,
    Divider
} from '@chakra-ui/react'
import { useForm, Controller } from 'react-hook-form';
import { IoClose } from "react-icons/io5";
import { BsEye } from 'react-icons/bs';
import { useCreateTaskMutation } from '../redux/apis/TaskApiSlice';
import React, { useRef, useState } from 'react';

enum Priority {
    HIGH = "High",
    MEDIUM = 'Medium',
    LOW = "Low"
}

enum Status {
    TODO = 'To Do',
    INPROGRESS = 'In Progress',
    DONE = 'Done',
    HOLD = 'Hold'
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
            return '#dc2626';
        case Priority.MEDIUM:
            return '#fbbf24';
        case Priority.LOW:
            return '#38bdf8'
    }
}

type OnsubmitProps = {
    title: string;
    projectName: string;
    assignees: string[];
    startDate: string;
    endDate: string;
    priority: string;
    status: string;
    progress: string
}

export const CreateTask = (props, ref) => {

    const [createTask, {
        isLoading,
        isError,
        error
    }] = useCreateTaskMutation();

    console.log({ isLoading, isError, error });

    const toast = useToast();

    // const [priority, setPriority] = useState<
    //     Priority.HIGH
    //     | Priority.MEDIUM
    //     | Priority.LOW
    //     | ''
    // >('')

    // const [status, setStatus] = useState<
    //     Status.COMPLETED
    //     | Status.PENDING
    //     | Status.TODO
    //     | ''
    // >('')

    const {
        control,
        watch,
        handleSubmit,
        register,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<any>()

    const assigneesRef = useRef([])

    const onSubmit = async (data: OnsubmitProps) => {

        try {

            let channelId = "658d9664f16f05566c6e6941";

            let payload = { ...data, assignees: assigneesRef.current, channelId }

            const response = await createTask(payload)

            console.log({ response });

        } catch (error) {
            console.log({ error })
            toast({
                title: 'Something went wrong',
                status: 'success',
                duration: 7000,
                isClosable: true,
            })
        }

        // let userId = '658c2f62d2d12f120b0e2f94'
        // let channelId = '658d454e9da782c94f04016f'

        // const formatted = FormatData({ channelId, priority, userId, title, content })

        // const response = await createAnnouncement(formatted);

        // if (response?.data?._id) {
        //     toast({
        //         title: 'Successfully announced !!',
        //         status: 'success',
        //         duration: 6000,
        //         isClosable: true,
        //     })
        // }

        // if (isError && error) {
        //     console.log({ error })
        //     toast({
        //         title: 'Something went wrong !!',
        //         status: 'error',
        //         duration: 6000,
        //         isClosable: true,
        //     })
        // }
    }

    const currentPriority = watch('priority');
    const currentStatus = watch('status');
    const progressPercent = watch('progress');

    return (
        <form
            className='w-full'
            onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.title}>
                <FormLabel htmlFor='title'>Title</FormLabel>
                <Input
                    minWidth={48}
                    id='title'
                    placeholder='Enter your title'
                    {...register('title', {
                        required: 'This is required',
                        minLength: { value: 4, message: 'Minimum length should be 4' },
                    })}
                />
                <FormErrorMessage>
                    {errors.title && errors.title.message}
                </FormErrorMessage>
            </FormControl>

            <SimpleGrid
                className='w-full my-3 mb-6'
                columns={3}
                spacing={6}>

                <FormControl isInvalid={errors.projectName}>
                    <FormLabel htmlFor='project-name'>Project Name</FormLabel>
                    <Input
                        minWidth={48}
                        id='project-name'
                        placeholder='Type your project name'
                        {...register('projectName', {
                            required: 'This is required',
                            minLength: { value: 4, message: 'Minimum length should be 4' },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.projectName && errors.projectName.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.startDate}>
                    <FormLabel htmlFor='start-date'>Start Date</FormLabel>
                    <Input
                        id='start-date'
                        minWidth={48}
                        placeholder='Select your start date'
                        type='date'
                        {...register('startDate', {
                            required: 'This is required',
                            minLength: { value: 4, message: 'Minimum length should be 4' },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.startDate && errors.startDate.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.endDate}>
                    <FormLabel htmlFor='end-date'>End Date</FormLabel>
                    <Input
                        id='end-date'
                        minWidth={48}
                        placeholder='Select your end date'
                        type='date'
                        {...register('endDate', {
                            required: 'This is required',
                            minLength: { value: 4, message: 'Minimum length should be 4' },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.endDate && errors.endDate.message}
                    </FormErrorMessage>

                </FormControl>

                <FormControl isInvalid={errors.priority}>
                    <FormLabel htmlFor='priority'>Priority</FormLabel>
                    <Controller
                        name="priority"
                        control={control}
                        defaultValue="Select priority"
                        render={({ field }) => (
                            <Select
                                id='priority'
                                bg={PriorityColorProvider(currentPriority)}
                                placeholder='Select priority'
                                {...field}
                            >
                                <option value={Priority.HIGH}>{Priority.HIGH}</option>
                                <option value={Priority.MEDIUM}>{Priority.MEDIUM}</option>
                                <option value={Priority.LOW}>{Priority.LOW}</option>

                            </Select>
                        )}
                    />
                    <FormErrorMessage>
                        {errors.priority && errors.priority.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.status}>
                    <FormLabel htmlFor='status'>Status</FormLabel>
                    <Controller
                        name="status"
                        control={control}
                        defaultValue="Select status"
                        render={({ field }) => (
                            <Select
                                id='status'
                                bg={StatusColorProvider(currentStatus)}
                                placeholder='Select status'
                                {...field}
                            >
                                <option value={Status.TODO}>{Status.TODO}</option>
                                <option value={Status.INPROGRESS}>{Status.INPROGRESS}</option>
                                <option value={Status.HOLD}>{Status.HOLD}</option>
                                <option value={Status.DONE}>{Status.DONE}</option>

                            </Select>
                        )}
                    />
                    <FormErrorMessage>
                        {errors.status && errors.status.message}
                    </FormErrorMessage>
                </FormControl>

                <div className='flex w-full justify-start items-end'>
                    <FormControl isInvalid={errors.progress}>
                        <FormLabel w={'fit-content'} htmlFor='progress'>
                            Progress
                        </FormLabel>
                        <Controller
                            name="progress"
                            control={control}
                            render={({ field }) => (
                                <NumberInput
                                    defaultValue={progressPercent}
                                    width={36}
                                    min={0}
                                    max={100}
                                    {...field} >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                    </NumberInputStepper>
                                </NumberInput>
                            )}
                        />

                        <FormErrorMessage>
                            {errors.progress && errors.progress.message}
                        </FormErrorMessage>
                    </FormControl>

                    <CircularProgress
                        mt={2}
                        ml={'0.5em'}
                        value={progressPercent}
                        color='green.400'>
                        <CircularProgressLabel>
                            {progressPercent || 0}%
                        </CircularProgressLabel>
                    </CircularProgress>
                </div>

            </SimpleGrid>

            <SelectAssignees ref={assigneesRef} />

            <div className='w-full flex justify-end '>
                <Button
                    className=' absolute rounded-none mb-2'
                    borderRadius={'initial'}
                    mt={8}
                    colorScheme='messenger'
                    isLoading={isSubmitting}
                    type='submit'
                >
                    Submit
                </Button>
            </div>

        </form>
    )
}

const SelectAssignees = React.forwardRef((props, ref: { current: string[] }) => {

    let mans = [
        { id: '658c2f62d2d12f120b0e2f94', name: 'Raju kadel', image: 'https://image-src' },
        { id: '658ce7eac8a55a6363ec5afb', name: 'Shraddha Upreti', image: 'https://image-src' },
        { id: '658ce862c8a55a6363ec5afd', name: 'Saru Dahal', image: 'https://image-src' },
    ]

    const [assignees, set] = useState<Object[] | []>([])

    const handleClick = (id: string, name: string, image: string) => {
        if (
            id &&
            name &&
            image
        ) {
            if (
                !ref.current.includes(id) &&
                !assignees.includes(id)
            ) {
                ref.current = [...ref.current, id]
                set(prev => [...prev, { id, name, image }])
            }
        }
    }

    const handleDelete = (id: string) => {
        if (id) {
            if (
                ref.current.includes(id)
            ) {
                ref.current = ref.current.filter((userId) => userId !== id);
                set(prev => prev.filter((user) => user.id !== id))
            }
        }
    }



    return (
        <div>
            <label className='font-semibold mr-3 mt-5'>
                Select Assignees
            </label>
            <Popover>
                <PopoverTrigger>
                    <Button
                        colorScheme='blue'
                        variant={'outline'}
                        rounded={'none'}
                        size={'xs'}>
                        Tag here
                        <BsEye className=' mx-1' size={14} />
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton className='text-white mt-1 font-semibold' />
                    <PopoverHeader className='bg-blue-500 text-white font-semibold'>Members</PopoverHeader>
                    <PopoverBody className='h-64 overflow-y-auto'>
                        <Spinner className='ml-[40%]' />
                        {
                            mans.map(({ id, name, image }) => (
                                <>
                                    <div
                                        onClick={() => handleClick(id, name, image)}
                                        className='flex p-1 hover:bg-slate-50 hover:cursor-pointer items-center bg-transparent space-x-4'>
                                        <Avatar size={'sm'} />
                                        <Text>{name}</Text>
                                    </div>
                                    <Divider />
                                </>
                            ))
                        }
                    </PopoverBody>
                </PopoverContent>
            </Popover>

            <div className='max-w-lg max-h-36 pt-3 overflow-y-auto flex flex-wrap items-start mb-2 my-2 space-y-2 p-2 space-x-2 rounded-md'>
                {
                    assignees.length > 0 &&
                    assignees.map((
                        { id, name, image }:
                            { id: string; name: string; image: string }
                    ) => (
                        <Tag
                            size='lg'
                            my={2}
                            colorScheme='blue'
                            variant={'outline'}
                            borderRadius='full'>
                            <Avatar
                                src={image}
                                size='xs'
                                name='Segun Adebayo'
                                ml={-1}
                                mr={2}
                            />
                            <TagLabel className='text-sm'>{name}</TagLabel>
                            <IoClose
                                onClick={() => handleDelete(id)}
                                size={16}
                                className='mt-1 mx-1 hover:text-red-400 hover:cursor-pointer' />
                        </Tag>
                    ))
                }
            </div>
        </div>
    )
})