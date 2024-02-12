import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Button,
    Avatar,
    Divider,
    Text
  } from '@chakra-ui/react'
import { BsEye } from 'react-icons/bs';
import { PulseLoader } from 'react-spinners';

export const SelectUsers = () => {

    // const { data, isLoading, isError } = useFetchAllUsersQuery()
    // console.log('Just adding token()');
    // console.log('##############################');
    // console.log({ data, isLoading, isError }, 'isLoadingData');
    // console.log('##############################');
    // console.log('Removing Token ()');

    let mans = [
        { id: '658c2f62d2d12f120b0e2f94', name: 'Raju kadel', image: 'https://image-src' },
        { id: '658ce7eac8a55a6363ec5afb', name: 'Shraddha Upreti', image: 'https://image-src' },
        { id: '658ce862c8a55a6363ec5afd', name: 'Saru Dahal', image: 'https://image-src' },
    ]

    // const [assignees, set] = useState<Object[] | []>([])

    // useEffect(() => {
    //     setTimeout(() => {
    //         set(ref.current)
    //     }, 200);
    // }, [])

    // const handleClick = (id: string, name: string, image: string) => {
        // console.log(id, name, image)
        // if (
        //     id &&
        //     name &&
        //     image
        // ) {
        //     if (
        //         !ref.current.includes(id) &&
        //         !assignees.includes(id)
        //     ) {
        //         ref.current = [...ref.current, id]
        //         set(prev => [...prev, { id, name, image }])
        //     }
        // }
    // }

    // const handleDelete = (id: string) => {
        // console.log('Pressed', id);

        // if (id) {
        //     console.log('reached here')
        //     ref.current = ref.current.filter((user) => user._id !== id);
        //     console.log(ref.current)
        //     set(prev => prev.filter((user) => user._id !== id))
        // }
    // }

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
                            mans?.length > 0 ?
                                (
                                    mans?.map((
                                        { id, name, pic }:any
                                            // { id: string; name: string; pic: string }
                                    ) => (
                                        <>
                                            <div
                                                // onClick={() => handleClick(id, name, pic)}
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
            {/* <div className='max-w-lg max-h-36 pt-3 overflow-y-auto flex flex-wrap items-start mb-2 my-2 space-y-2 p-2 space-x-2 rounded-md'>
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
            </div> */}
        </div>
    )
}