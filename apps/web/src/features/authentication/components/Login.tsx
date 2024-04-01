import {
    Box,
    Flex,
    Stack,
    Heading,
    Text,
    Container,
    Input,
    Button,
    SimpleGrid,
    Avatar,
    AvatarGroup,
    useBreakpointValue,
    Icon,
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { storeCredentials } from '../redux/slices/userSlice';
import { useLoginMutation } from '../redux/apis/authApiSlice';

const avatars = [
    {
        name: 'Ryan Florence',
        url: 'https://bit.ly/ryan-florence',
    },
    {
        name: 'Segun Adebayo',
        url: 'https://bit.ly/sage-adebayo',
    },
    {
        name: 'Kent Dodds',
        url: 'https://bit.ly/kent-c-dodds',
    },
    {
        name: 'Prosper Otemuyiwa',
        url: 'https://bit.ly/prosper-baba',
    },
    {
        name: 'Christian Nwamba',
        url: 'https://bit.ly/code-beast',
    },
]

const Blur = (props: any) => {
    return (
        <Icon
            width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
            zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
            height="560px"
            viewBox="0 0 528 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <circle cx="71" cy="61" r="111" fill="#F56565" />
            <circle cx="244" cy="106" r="139" fill="#ED64A6" />
            <circle cy="291" r="139" fill="#ED64A6" />
            <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
            <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
            <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
            <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
        </Icon>
    )
}
export default function Login() {
    const initial = {
        email: '',
        password: '',
    }
    const [formData, setFormData] = useState(initial);
    const navigateTo = useNavigate()
    const dispatch = useDispatch()
    const toast = useToast()
    const [login, {
        isLoading,
        isError,
        isSuccess,
        error
    }] = useLoginMutation<any>();
    const handleChange = (e: any) => {
        setFormData(
            {
                ...formData,
                [e.target.name]: e.target.value
            }
        )
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const { email, password } = formData;
            const { accessToken, user } = await login({ email, password }).unwrap()
            // console.log({ user })
            localStorage.setItem('isUser', 'yes');
            dispatch(storeCredentials({ accessToken, user }));
            setFormData(initial);
            navigateTo('/dashboard');
        } catch (err: any) {
            let errMessage = err?.data?.error?.details[0]?.message;
            toast({
                title: errMessage,
                status: 'success',
                isClosable: true,
                duration: 5000
            });
            // if (!err.status) {
            //     setErrMsg('No Server Response');
            // } else if (err.status === 400) {
            //     setErrMsg('Missing Username or Password');
            // } else if (err.status === 401) {

            //     setErrMsg('Unauthorized');
            // } else {
            //     setErrMsg(err.data?.message);
            // }
            // errRef.current.focus();
        }
    };
    return (
        <Box position={'relative'} height={'100vh'} overflow={'hidden'}>
            <Container
                as={SimpleGrid}
                maxW={'7xl'}
                columns={{ base: 1, md: 2 }}
                spacing={{ base: 10, lg: 32 }}
                py={{ base: 10, sm: 20, lg: 32 }}>
                <Stack spacing={{ base: 10, md: 20 }}>
                    <Heading
                        lineHeight={1.1}
                        fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
                        Senior web designers{' '}
                        <Text as={'span'} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
                            &
                        </Text>{' '}
                        Full-Stack Developers
                    </Heading>
                    <Stack direction={'row'} spacing={4} align={'center'}>
                        <AvatarGroup>
                            {avatars.map((avatar) => (
                                <Avatar
                                    key={avatar.name}
                                    name={avatar.name}
                                    src={avatar.url}
                                    // eslint-disable-next-line react-hooks/rules-of-hooks
                                    size={useBreakpointValue({ base: 'md', md: 'lg' })}
                                    position={'relative'}
                                    zIndex={2}
                                    _before={{
                                        content: '""',
                                        width: 'full',
                                        height: 'full',
                                        rounded: 'full',
                                        transform: 'scale(1.125)',
                                        bgGradient: 'linear(to-bl, red.400,pink.400)',
                                        position: 'absolute',
                                        zIndex: -1,
                                        top: 0,
                                        left: 0,
                                    }}
                                />
                            ))}
                        </AvatarGroup>
                        <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
                            +
                        </Text>
                        <Flex
                            align={'center'}
                            justify={'center'}
                            fontFamily={'heading'}
                            fontSize={{ base: 'sm', md: 'lg' }}
                            bg={'gray.800'}
                            color={'white'}
                            rounded={'full'}
                            minWidth={useBreakpointValue({ base: '44px', md: '60px' })}
                            minHeight={useBreakpointValue({ base: '44px', md: '60px' })}
                            position={'relative'}
                            _before={{
                                content: '""',
                                width: 'full',
                                height: 'full',
                                rounded: 'full',
                                transform: 'scale(1.125)',
                                bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                                position: 'absolute',
                                zIndex: -1,
                                top: 0,
                                left: 0,
                            }}>
                            YOU
                        </Flex>
                    </Stack>
                </Stack>
                <Stack
                    bg={'gray.50'}
                    rounded={'xl'}
                    p={{ base: 4, sm: 6, md: 8 }}
                    spacing={{ base: 8 }}
                    maxW={{ lg: 'lg' }}>
                    <Stack spacing={4}>
                        <Heading
                            color={'gray.800'}
                            lineHeight={1.1}
                            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                            Join our team
                            <Text as={'span'} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
                                !
                            </Text>
                        </Heading>
                        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                            We’re looking for amazing engineers just like you! Become a part of our
                            rockstar engineering team and skyrocket your career!
                        </Text>
                    </Stack>
                    <Box as={'form'} mt={10}>
                        <Stack spacing={4}>
                            <Input
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                type='text'
                                placeholder="Email"
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                            />
                            <Input
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                type='password'
                                placeholder="Password"
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                            />
                        </Stack>
                        <Button
                            onClick={handleSubmit}
                            fontFamily={'heading'}
                            mt={8}
                            w={'full'}
                            bgGradient="linear(to-r, red.400,pink.400)"
                            color={'white'}
                            _hover={{
                                bgGradient: 'linear(to-r, red.400,pink.400)',
                                boxShadow: 'xl',
                            }}>
                            Submit
                        </Button>
                        <Text my={4}>
                            Don't have an account ?
                            <Link to={'/auth/register'}>
                                <span className='underline px-2 text-pink-400'>Register here</span>
                            </Link>
                        </Text>
                    </Box>
                    form
                </Stack>
            </Container>
            <Blur position={'absolute'} top={-10} left={-10} style={{ filter: 'blur(70px)' }} />
        </Box>
    )
}