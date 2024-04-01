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
import { useUpdateTaskMutation } from '../redux/apis/TaskApiSlice';
import React, { useRef, useState, useEffect } from 'react';
import { useFetchAllUsersQuery } from '@/features/text-chat/redux/apis/chatApiSlice';
import { PulseLoader } from 'react-spinners';

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

export const UpdateTask = React.forwardRef((props, ref) => {

    const toast = useToast()

    const [updateTask, {
        isLoading
    }] = useUpdateTaskMutation()

    const {
        handleSubmit,
        register,
        setValue,
        watch,
        control,
        formState: { errors, isSubmitting },
    } = useForm<any>()

    const assigneesRef = useRef([])

    const currentPriority = watch('priority');
    const currentStatus = watch('status');
    const progressPercent = watch('progress');

    useEffect(() => {

        console.log('******************')
        console.log(ref.current.startDate);
        console.log(ref.current.endDate);

        setValue('title', ref.current.title);

        setValue('projectName', ref.current.projectName);

        setValue('priority', ref.current.priority);

        setValue('status', ref.current.status);

        setValue('startDate', ref.current.startDate);

        setValue('endDate', ref.current.endDate);

        setValue('progress', ref.current.progress);

        setValue('assignees', ref.current.assignees)

        assigneesRef.current = ref.current.assignees

    }, [])

    const onSubmit = async (formData: OnsubmitProps) => {

        try {
            console.log('onSUbmit function is called');

            let channelId = "658d9664f16f05566c6e6941";

            let payload = {
                ...formData,
                assignees: assigneesRef.current.map(user => user._id),
                channelId,
                _id: ref.current._id
            }

            console.log({ payload }, 'submit data')

            const response = await updateTask(payload)

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
    }

    console.log(ref.current.startDate, 'start date');
    console.log(ref.current.endDate, 'end date');

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

                <FormControl isInvalid={errors.endDate}>
                    <FormLabel htmlFor='start-date'>Start Date</FormLabel>
                    <Input
                        id='start-date'
                        minWidth={48}
                        defaultValue={"2023-02-02 08:23 PM"}
                        placeholder='Select your end date'
                        type='datetime-local'
                        {...register('startDate')}
                    />
                    <FormErrorMessage>
                        {errors.endDate && errors.endDate.message}
                    </FormErrorMessage>

                </FormControl>

                <FormControl isInvalid={errors.endDate}>
                    <FormLabel htmlFor='end-date'>End Date</FormLabel>
                    <Input
                        id='end-date'
                        minWidth={48}
                        defaultValue={"02/03/2023"}
                        placeholder='Select your end date'
                        type='date'
                        {...register('endDate')}
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
})

const SelectAssignees = React.forwardRef((props, ref) => {

    const { data, isLoading, isError } = useFetchAllUsersQuery();

    console.log('Just adding token()');
    console.log('##############################');
    console.log({ data, isLoading, isError }, 'isLoadingData');
    console.log('##############################');
    console.log('Removing Token ()');



    const [assignees, set] = useState<Object[] | []>([])

    useEffect(() => {
        setTimeout(() => {
            set(ref.current)
        }, 200);
    }, [])

    const handleClick = (id: string, name: string, image: string) => {
        console.log(id, name, image)
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
        console.log('Pressed', id);

        if (id) {
            console.log('reached here')
            ref.current = ref.current.filter((user) => user._id !== id);
            console.log(ref.current)
            set(prev => prev.filter((user) => user._id !== id))
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
                        {
                            data?.allUsers?.length > 0 ?
                                (
                                    data?.allUsers.map((
                                        { id, name, pic }:
                                            { id: string; name: string; pic: string }
                                    ) => (
                                        <>
                                            <div
                                                onClick={() => handleClick(id, name, pic)}
                                                className='flex p-1 hover:bg-slate-50 hover:cursor-pointer items-center bg-transparent space-x-4'>
                                                <Avatar name={name} colorScheme='red' size={'sm'} />
                                                <Text>{name}</Text>
                                            </div>
                                            <Divider />
                                        </>
                                    ))
                                ) : (
                                    <div className='w-full py-8 flex justify-center items-center'>
                                        <PulseLoader color='blue' size={12} />
                                    </div>
                                )
                        }
                    </PopoverBody>
                </PopoverContent>
            </Popover>
            <div className='max-w-lg max-h-36 pt-3 overflow-y-auto flex flex-wrap items-start mb-2 my-2 space-y-2 p-2 space-x-2 rounded-md'>
                {
                    assignees.length > 0 &&
                    assignees.map((
                        { _id, name, image }:
                            { _id: string; name: string; image: string }
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
                                onClick={() => handleDelete(_id)}
                                size={16}
                                className='mt-1 mx-1 hover:text-red-400 hover:cursor-pointer' />
                        </Tag>
                    ))
                }
            </div>
        </div>
    )
})