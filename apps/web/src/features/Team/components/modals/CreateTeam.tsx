import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Input,
    Switch,
    Button,
    Divider,
    Avatar,
    Text,
    useToast
} from '@chakra-ui/react';
import {
    SimpleGrid,
    FormErrorMessage,
    FormLabel,
    FormControl,
    Textarea
} from '@chakra-ui/react';
import {
    useForm,
    FormProvider,
    useFormContext,
    Controller
} from 'react-hook-form';
import { useEffect, useState } from 'react';
import { HiUserGroup } from "react-icons/hi2";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { RiWechatChannelsLine } from "react-icons/ri";
import { SearchMemberInput } from '../SearchMember';
import { AvatarWithUser } from '../AvatarWithUser';
import { CreateTeamContextProvider } from '../../providers/create-team';
import { useCreateTeamMutation } from '../../redux/apis/teamApiSlice';
import { useFetchAllUsersQuery } from '@/features/text-chat/redux/apis/chatApiSlice';
import { IoClose } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { userSelector } from '@/features/authentication/redux/slices/userSlice';

type TailwindColor =
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'teal'
    | 'blue'
    | 'indigo'
    | 'purple'
    | 'pink'
    | 'gray';

type TailwindBackgroundColor = `${TailwindColor}-500`;

const tailwindColors: TailwindColor[] = [
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'indigo',
    'purple',
    'pink',
    'gray',
];

function getRandomTailwindBackgroundColor(): TailwindBackgroundColor {
    const randomColorIndex = Math.floor(Math.random() * tailwindColors.length);
    const randomColor = tailwindColors[randomColorIndex];

    return `${randomColor}-500` as TailwindBackgroundColor;
}

const randomBackgroundColor: TailwindBackgroundColor = getRandomTailwindBackgroundColor();
console.log({ randomBackgroundColor });

const Appearance = () => {
    const { control } = useFormContext();
    const methods = useForm();
    const handleAddMember = () => {
        methods.setValue('members', [...methods.getValues('members'), 'New Member']);
    };
    return (
        <>
            <div className='flex my-4 justify-between px-2'>
                <Text className='font-semibold'>Make Private</Text>
                <Switch colorScheme='red' className='my-3' color='black' size='lg' />
            </div>
            <div className='flex my-4 justify-between px-2'>
                <Text className='font-semibold'>Admin Preference</Text>
                <Switch colorScheme='green' className='my-3' color='black' size='lg' />
            </div>
            <div className='flex my-4 justify-between px-2'>
                <Text className='font-semibold'>Shared Channels</Text>
                <Switch colorScheme='teal' className='my-3' color='black' size='lg' />
            </div>
            <SimpleGrid className='w-full' alignItems={'center'} columns={1} spacing={6}>
                <Controller
                    name=""
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'This is required',
                        minLength: { value: 4, message: 'Min length is 4' },
                        maxLength: { value: 80, message: 'Max length is 80' }
                    }}
                    render={({ field, fieldState }) => (
                        <FormControl isInvalid={fieldState.invalid}>
                            <FormLabel htmlFor='title'>Team Name</FormLabel>
                            <Input
                                {...field}
                                minWidth={48}
                                id='title'
                                placeholder='Enter your team name'
                            />
                            <FormErrorMessage>
                                {fieldState.error && fieldState.error.message}
                            </FormErrorMessage>
                        </FormControl>
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'This is required',
                        minLength: { value: 4, message: 'Min length is 4' },
                        maxLength: { value: 80, message: 'Max length is 80' }
                    }}
                    render={({ field, fieldState }) => (
                        <FormControl isInvalid={fieldState.invalid}>
                            <FormLabel htmlFor='name'>Description</FormLabel>
                            <Textarea
                                {...field}
                                placeholder='Some description...'
                                size='sm'
                            />
                            <FormErrorMessage>
                                {fieldState.error && fieldState.error.message}
                            </FormErrorMessage>
                        </FormControl>
                    )}
                />
            </SimpleGrid>
        </>
    )
}

const General = () => {
    const { control } = useFormContext();

    return (
        <>
            <SimpleGrid className='w-full' alignItems={'center'} columns={1} spacing={6}>
                <Controller
                    name="teamName"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'This is required',
                        minLength: { value: 4, message: 'Min length is 4' },
                        maxLength: { value: 80, message: 'Max length is 80' }
                    }}
                    render={({ field, fieldState }) => (
                        <FormControl isInvalid={fieldState.invalid}>
                            <FormLabel htmlFor='title'>Team Name</FormLabel>
                            <Input
                                {...field}
                                minWidth={48}
                                id='title'
                                placeholder='Enter your team name'
                            />
                            <FormErrorMessage>
                                {fieldState.error && fieldState.error.message}
                            </FormErrorMessage>
                        </FormControl>
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'This is required',
                        minLength: { value: 4, message: 'Min length is 4' },
                        maxLength: { value: 80, message: 'Max length is 80' }
                    }}
                    render={({ field, fieldState }) => (
                        <FormControl isInvalid={fieldState.invalid}>
                            <FormLabel htmlFor='name'>Description</FormLabel>
                            <Textarea
                                {...field}
                                placeholder='Some description...'
                                size='sm'
                            />
                            <FormErrorMessage>
                                {fieldState.error && fieldState.error.message}
                            </FormErrorMessage>
                        </FormControl>
                    )}
                />
            </SimpleGrid>
        </>
    )
};

const Members = () => {
    const [updater, set] = useState<boolean>(false);
    const { data } = useFetchAllUsersQuery();
    const { getValues, setValue } = useFormContext();

    const handleClick = () => {
        console.log('close is clicked on the red button');
    };

    // const handleRemoveMember = (_indexToRemove: number) => {
    //     const updatedMembers = getValues('members')
    //         .filter((member: any) => member._id !== user._id)

    //     setValue('members', updatedMembers);
    //     set(prev => !prev);
    // };

    return (
        <>
            <SearchMemberInput />
            <div className='h-fit py-2 flex items-start justify-start flex-wrap space-x-2 w-full'>
                {
                    getValues('members')?.map((user: any) => (
                        <>
                            <div
                                onClick={handleClick}
                                className='flex px-1 bg-slate-50 mb-3 h-fit w-fit py-1 rounded-full hover:bg-slate-50 hover:cursor-pointer items-center space-x-2'>
                                <Avatar name={user?.name} colorScheme='red' size={'sm'} />
                                <Text className='text-sm'>{user.name?.split(' ')[0]}</Text>
                                {/* <IoClose onClick={() => handleRemoveMember(user?._id)} /> */}
                            </div>
                        </>
                    ))
                }
            </div >
            <div className='h-[50vh] overflow-y-auto'>
                {
                    data?.allUsers
                        ?.map((user: any) => (
                            <>
                                <AvatarWithUser
                                    set={set}
                                    type='member'
                                    user={user}
                                />
                                <Divider />
                            </>
                        ))
                }
            </div>
        </>
    )
};

const Channels = () => {
    const { control } = useFormContext();
    const { register } = useForm<any>()

    return (
        <>
            <SimpleGrid className='w-full' alignItems={'center'} columns={2} spacing={6}>
                <Controller
                    name="field1"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
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
                    )}
                />
                <Controller
                    name="field1"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
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
                                        {/* <option value={Priority.High}>High</option>
                                    <option value={Priority.Medium}>Medium</option>
                                    <option value={Priority.Low}>Low</option> */}
                                    </select>
                                )}
                            />
                            <p>{errors.priority && errors.priority.message}</p>
                        </FormControl>
                    )}
                />
            </SimpleGrid>

            <div>
                <p>Teams.message</p>
            </div>

            <Controller
                name="field1"
                control={control}
                defaultValue=""
                render={({ field }) => (
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
                )}
            />
            {/* <SearchMemberInput /> */}
            {/* <AvatarWithUser type='channel' name='Raju kadel' avatar='' /> */}
        </>
    )
}

const CreateTeam = () => {
    const user = useSelector(userSelector);
    const [createTeam, { isError, error }] = useCreateTeamMutation();
    const methods = useForm();
    const toast = useToast();
    console.log({ user });

    const getMembers = (members: any) => {
        return members.map((user) => user._id);
    }
    const getOwners = (owners: any) => {
        const selectedOwners = owners.map((user) => user._id);
        const selectedOwnersWithMe = [...selectedOwners, user._id];
        console.log({ selectedOwnersWithMe });
        return selectedOwnersWithMe;
    }
    const onSubmit = async (data: any) => {
        console.log({ data });
        try {
            let payload = {
                name: data.teamName,
                owners: data?.owners ? getOwners(data.owners) : [user._id],
                members: getMembers(data.members),
                userId: user?._id
            }
            console.log({ payload })
            // const res = await createTeam(payload);
            // console.log({ res });
            // if (res?.status == 200) {
            //     toast({
            //         title: 'Team created successfully',
            //         description: "Now enjoy with your team in your work.",
            //         status: 'success',
            //         duration: 7000,
            //         isClosable: true,
            //     })
            // }
        } catch (error) {
            console.log({ error })
            toast({
                title: 'Team creation failed.',
                description: "Something went out. Please try again later.",
                status: 'error',
                duration: 7000,
                isClosable: true,
            })
        }
    };
    const handleSubmit = async () => {
        try {

            if (
                members
                || owners
                || teamName
                || channels
            ) {
                // const resData = await createTeam(
                //     {
                //         members,
                //         owners,
                //         name: teamName,
                //         channels,
                //         userId: 'fake-1238574-id'
                //     });
                const resData = await createTeam(
                    {
                        name: "Delta-Hackathon",
                        channels:
                            [
                                "658c2f62d2d12f120b0e2f94",
                                "658c2f62d2d12f120b0e2f94"
                            ],
                        owners: ["658c2f62d2d12f120b0e2f94"],
                        members: ["658c2f62d2d12f120b0e2f94"],
                        userId: "658c2f62d2d12f120b0e2f94"
                    }
                );
                console.log({ resData });
                if (isError && error) {
                    console.log({
                        isError,
                        error
                    })
                }
            }

        } catch (error) {
            console.log({ error });
        }
    }
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className='shadow-sm'>
                    <Tabs colorScheme='green' overflowX={'hidden'}>
                        <TabList>
                            <Tab className='font-lato'>
                                <IoMdInformationCircleOutline className='mx-2' size={18} />
                                General
                            </Tab>
                            <Tab>
                                <HiUserGroup className='mx-2' size={18} />
                                Members
                            </Tab>
                            <Tab>
                                <RiWechatChannelsLine className='mx-2' size={18} />
                                Appearance
                            </Tab>
                        </TabList>
                        <TabPanels height={'60vh'} className='h-full overflow-hidden'>
                            <TabPanel>
                                <General />
                            </TabPanel>
                            <TabPanel>
                                <Members />
                            </TabPanel>
                            <TabPanel>
                                <Appearance />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
                <Button
                    _hover={{ bg: 'black', textColor: 'white' }}
                    w={'full'}
                    textColor={'white'}
                    bg={'black'}
                    type='submit'>
                    Submit Now
                </Button>
            </form>
        </FormProvider>
    )
}

export const CreateTeamWithProvider = () => {
    return (
        <CreateTeamContextProvider>
            <CreateTeam />
        </CreateTeamContextProvider>
    )
}



