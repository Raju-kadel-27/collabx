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
    useToast,
    Stack,
    Checkbox
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
import { useState } from 'react';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { RiWechatChannelsLine } from "react-icons/ri";
import { HiUserGroup } from 'react-icons/hi2';
import { SearchMemberInput } from '../SearchMember';
import { AvatarWithUser } from '../AvatarWithUser';
import { useSelector } from 'react-redux';
import { userSelector } from '@/features/authentication/redux/slices/userSlice';
import { useLocation } from 'react-router';
import { useCreateChannelMutation, useGetAllTeamMembersQuery } from '../../redux/apis/teamApiSlice';

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
    | 'gray'

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
console.log({ randomBackgroundColor });

const Appearance = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [activeColor, setActiveColor] = useState<string>('#3b82f6');
    const { setValue } = useFormContext();

    const colorPaletteWithHex = [
        { name: 'bg-blue-500', hex: '#3b82f6' },
        { name: 'bg-green-500', hex: '#10b981' },
        { name: 'bg-yellow-500', hex: '#f59e0b' },
        { name: 'bg-gray-500', hex: '#6b7280' },
        { name: 'bg-red-500', hex: '#ef4444' },
        { name: 'bg-purple-500', hex: '#8b5cf6' },
        { name: 'bg-indigo-500', hex: '#6366f1' },
        { name: 'bg-pink-500', hex: '#ec4899' },
    ];

    const handleChange = () => {
        if (isChecked) {
            setValue('systemPreference', false);
        } else {
            setValue('systemPreferece', true);
        }
        setIsChecked(!isChecked);
    }

    const handleColor = (colorName: string, colorHex: string) => {
        setValue('theme', colorHex);
        setActiveColor(colorHex);
    }

    return (
        <>
            <div className='w-full py-4 px-8 space-x-3 flex flex-wrap'>
                {colorPaletteWithHex.map((color: any) => (
                    <div className='items-center flex flex-col items-center justify-center'>
                        <div onClick={() => handleColor(color.name, color.hex)} className={`h-10 w-10 rounded-full ${color.name}`}></div>
                        <p className='text-xs font-normal '>{color.hex}</p>
                    </div>
                ))}
            </div>
            <Stack my={4} className='p-4 shadow-md'>
                <Text className='font-semibold'>
                    Current Theme :
                    <Text fontSize={'bold'} mx={2} color={activeColor} as={'span'}>
                        {activeColor}
                    </Text>
                </Text>
            </Stack>
            <Stack my={8} className='p-4 shadow-md'>
                <Checkbox
                    onChange={handleChange}
                    isChecked={isChecked}
                    size='md'
                >
                    Use System Preference
                </Checkbox>
            </Stack>
        </>
    )
}

const General = () => {
    const { control, setValue } = useFormContext();
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const handleSwitch = () => {
        if (isChecked) {
            setValue('mode', 'Public');
        } else {
            setValue('mode', 'Private');
        }
        setIsChecked(!isChecked);
    }
    return (
        <>
            <SimpleGrid className='w-full' alignItems={'center'} columns={1} spacing={6}>
                <Controller
                    name="channelName"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'This is required',
                        minLength: { value: 4, message: 'Min length is 4' },
                        maxLength: { value: 80, message: 'Max length is 80' }
                    }}
                    render={({ field, fieldState }) => (
                        <FormControl isInvalid={fieldState.invalid}>
                            <FormLabel htmlFor='title'>Channel Name</FormLabel>
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
                                placeholder='Some description about your channel'
                                size='sm'
                            />
                            <FormErrorMessage>
                                {fieldState.error && fieldState.error.message}
                            </FormErrorMessage>
                        </FormControl>
                    )}
                />
            </SimpleGrid>
            <div className='flex my-4 justify-between px-2'>
                <Text className='font-semibold'>Private Channel</Text>
                <Switch
                    isChecked={isChecked}
                    onChange={handleSwitch}
                    colorScheme='teal'
                    color='black'
                    size='lg' />
            </div>
        </>
    )
};

const Members = () => {
    const { pathname } = useLocation();
    let teamId = getTeamId(pathname);
    const { data } = useGetAllTeamMembersQuery({ teamId }, { skip: !teamId });

    const [updater, set] = useState<boolean>(false);
    const { getValues, setValue } = useFormContext();

    function getTeamId(pathname: string) {
        return pathname.split('/')[2];
    }
    return (
        <>
            <SearchMemberInput />
            <div className='h-fit py-2 flex items-start justify-start flex-wrap space-x-2 w-full'>
                {
                    getValues('members')?.map((user: any) => (
                        <>
                            <div
                                className='flex px-1 bg-slate-50 mb-3 h-fit w-fit py-1 rounded-full hover:bg-slate-50 hover:cursor-pointer items-center space-x-2'>
                                <Avatar name={user?.name} colorScheme='red' size={'sm'} />
                                <Text className='text-sm'>{user.name?.split(' ')[0]}</Text>
                                {/* <IoClose onClick={() => handleRemoveMember(user)} /> */}
                            </div>
                        </>
                    ))
                }
            </div >
            <div className='h-[50vh] overflow-y-auto'>
                {
                    data?.members
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

export const CreateChannel = () => {
    const { pathname } = useLocation()
    const user = useSelector(userSelector);
    const [createChannel, { isError, error }] = useCreateChannelMutation();
    const methods = useForm();
    const toast = useToast();

    const teamId = getTeamIdFromPath(pathname);

    const getMembers = (members: any) => {
        return members.map((user: any) => user._id);
    };
    const getAdmins = (admins: any) => {
        if (!admins.length) return;
        const selectedOwners = admins.map((user: any) => user._id);
        const selectedOwnersWithMe = [...selectedOwners, user._id];
        return selectedOwnersWithMe;
    };
    const getManagers = (managers: any) => {
        if (!managers.length) return;
        const selectedManager = managers.map((user: any) => user._id);
        const selectedManagersWithMe = [...selectedManager, user._id];
        return selectedManagersWithMe;
    };
    function getTeamIdFromPath(pathname: string) {
        return pathname.split('/')[2]
    }
    const onSubmit = async (data: any) => {
        console.log({ data }, 'SUbmitting data..');
        try {
            let payload = {
                name: data.channelName,
                teamId: teamId,
                admins: getAdmins(data.admins) || [],
                managers: getManagers(data.managers) || [],
                members: getMembers(data.members) || [],
                systemPreference: data.systemPreference || false,
                channelMode: data.mode || 'Public',
                theme: data.theme
            };
            const res = await createChannel(payload);
            if (res) {
                toast({
                    title: 'Team created successfully',
                    description: "Now enjoy with your team in your work.",
                    status: 'success',
                    duration: 7000,
                    isClosable: true,
                })
            }
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

const manageTeam = () => {
    try {
        console.log('Managing Team in house');
    } catch (error) {
        console.log(error)
    }
}





