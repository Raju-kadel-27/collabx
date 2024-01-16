import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Text,
    Drawer,
    DrawerContent,
    useDisclosure,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from '@chakra-ui/react'
import {
    FiSettings,
    FiMenu,
    FiBell,
    FiChevronDown,
} from 'react-icons/fi'
import { AiOutlineTeam } from 'react-icons/ai'
import { BsPlusCircle, BsCalendarCheck } from 'react-icons/bs'
import { LuSchool } from 'react-icons/lu'
import Houses from '../Houses/Houses'
import CreateTeam from '../CreateTeam/CreateTeam'
import YourTeams from '../YourTeams/YourTeams'
import Settings from '../Settings/Settings'
import { useState } from 'react'
import { ClassCalendar } from '../Calendar/Calendar'
import { SchedulerModal } from '../../../text-chat/components/SchedulerModal/SchedulerModal'
import { TeamDetails } from '../TeamDetails/TeamDetails'
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

const LinkItems = [
    { name: 'Create Group', icon: BsPlusCircle },
    { name: 'Teams', icon: LuSchool },
    { name: 'Calendar', icon: BsCalendarCheck },
    { name: 'Settings', icon: FiSettings },
]

const SidebarContent = ({ onClose, setCurrent, currentSelected, ...rest }) => {

    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.100', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >

            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Classroom
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>

            {LinkItems.map((link) => (
                <NavItem
                    onClick={() => setCurrent(link.name)}
                    setCurrent
                    linkName={link.name}
                    icon={link.icon}
                    color={currentSelected == link.name ? 'gray.200' : ''}
                >
                    <span
                        style={{ color: currentSelected == link.name ? '#039be5' : '' }}>
                        {link.name}
                    </span>

                </NavItem>
            ))}

            <div className='mt-[51vh] flex items-center px-5 justify-between'>
                <div className='flex items-center space-x-4'>
                    <Avatar size={'sm'} bg={'black'} name='R' />
                    <p font->Raju kadel</p>
                </div>
                <div>
                    {
                        true ?
                            <MdOutlineDarkMode size={22} />
                            :
                            <MdOutlineLightMode size={22} />
                    }
                </div>
            </div>
        </Box>
    )
}

const NavItem = ({ setCurrent, linkName, color, icon, children, ...rest }) => {
    return (
        <Box
            as="a"
            href="#"
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                bg={color}
                color={color ? 'gray.900' : 'gray.700'}
                _hover={{
                    bg: !color ? 'gray.50' : '',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        color={!color ? 'gray.600' : 'blue.600'}
                        fontSize="20"
                        _groupHover={{
                            color: !color ? 'gray.600' : '',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Box>
    )
}

const MobileNav = ({ onOpen, ...rest }) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="16"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            // borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}>
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                Logo
            </Text>

            <HStack spacing={{ base: '0', md: '6' }}>
                <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                />
                                <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2">
                                    <Text fontSize="sm">Justina Clark</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        Admin
                                    </Text>
                                </VStack>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <MenuItem>Billing</MenuItem>
                            <MenuDivider />
                            <MenuItem>Sign out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    )
}

const ClassroomLayout = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [currentSelected, setCurrent] = useState('Create Group')
    let content;

    switch (currentSelected) {
        case 'Create Group':
            content = <CreateTeam />
            break;
        case 'Your Groups':
            content = <YourTeams />
            break;
        case 'Teams':
            content = <Houses />
            break;
        case 'Calendar':
            content = <ClassCalendar />
            break;
        case 'Settings':
            content = <SchedulerModal />
            break;
        default:
            break;
    }

    return (
        <Box minH="100vh" bg={useColorModeValue('gra', 'gray.900')}>
            <SidebarContent
                setCurrent={setCurrent}
                currentSelected={currentSelected}
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }} />

            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>

            {/* <MobileNav onOpen={onOpen} /> */}
            <Box ml={{ base: 0, md: 60 }}>
                {content}
            </Box>
        </Box>
    )
}

export default ClassroomLayout