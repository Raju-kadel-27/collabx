import { useForm } from 'react-hook-form';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    useDisclosure,
    Button,
    SimpleGrid,
    useToast,
    Text
} from '@chakra-ui/react';
import { LiaPollSolid } from "react-icons/lia";
import { useCreatePollMutation } from '../redux/apis/pollingApiSlice';

interface CreatePoll {
    channelId: string;
    title: string;
    description: boolean;
    tags: string[];
    comments: string[];
    postId: boolean;
    customDomains: string[];
    arrayModels: string;
}
const CreatePoll = () => {
    const [createPoll,{isLoading, error}]=useCreatePollMutation()
    console.log({isLoading, error});
    console.log({
        isLoading,
        error
    })
    const {
        control,
        watch,
        handleSubmit,
        register,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<any>()
    console.log({errors})
    const toast=useToast();
    const onSubmit = async (formData:any) => {
        try {
            console.log('Form is being submitted now()');
            console.log({formData});

            let payload={
                title:"",
                channelId: "",
                question:"",
                createdBy:"",
                answer:"",
                tags:[],
                comments:[]
            }
            console.log({payload})
            const response= await createPoll(payload);
            console.log({response});
    
            if(response?.data){
                console.log('Solving responses -->>>');
                console.log('Getting api responses');
                toast({
                    title: 'Poll Created.',
                    description: "We've created your poll.",
                    status: 'success',
                    duration: 7000,
                    isClosable: true,
                  })
            }
        } catch (error) {
            console.log({error});
            toast({
                title: 'Poll Creation failed.',
                description: "Something went out.",
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
        }
     }
    return (
        <div>
            <div>
                <LiaPollSolid  color='red' size={32}/>
            </div>
            <form
                className='w-full'
                onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.pollQuestion}>
                    <FormLabel htmlFor='title'> Ask your Poll ?</FormLabel>
                    <Input
                        minWidth={48}
                        id='title'
                        placeholder='Enter your title'
                        {...register('pollQuestion', {
                            required: 'This is required',
                            minLength: { value: 4, message: 'Minimum length should be 4' },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.pollQuestion && errors.pollQuestion.message}
                    </FormErrorMessage>
                </FormControl>

                <SimpleGrid columnGap={4} columns={2}>

                    <FormControl isInvalid={errors.option1}>
                        <FormLabel htmlFor='title'>Option1</FormLabel>
                        <Input
                            minWidth={48}
                            id='title'
                            placeholder='Enter your title'
                            {...register('option1', {
                                required: 'This is required',
                                minLength: { value: 4, message: 'Minimum length should be 4' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.option1 && errors.option1.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.option2}>
                        <FormLabel htmlFor='title'>Option2</FormLabel>
                        <Input
                            minWidth={48}
                            id='title'
                            placeholder='Enter your title'
                            {...register('option2', {
                                required: 'This is required',
                                minLength: { value: 4, message: 'Minimum length should be 4' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.option2 && errors.option2.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.option3}>
                        <FormLabel htmlFor='title'>Option3</FormLabel>
                        <Input
                            minWidth={48}
                            id='title'
                            placeholder='Enter your title'
                            {...register('option3', {
                                required: 'This is required',
                                minLength: { value: 4, message: 'Minimum length should be 4' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.option3 && errors.option3.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.title}>
                        <FormLabel htmlFor='title'>Option4</FormLabel>
                        <Input
                            minWidth={48}
                            id='title'
                            placeholder='Enter your title'
                            {...register('option4', {
                                required: 'This is required',
                                minLength: { value: 4, message: 'Minimum length should be 4' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.option4 && errors.option4?.message}
                        </FormErrorMessage>
                    </FormControl>
                </SimpleGrid>

            </form>
        </div>
    )
}

export default function CreatePollModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button size={'sm'} color={'white'} bg={'black'} onClick={onOpen}>Create Poll</Button>
            <Modal size={'2xl'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <CreatePoll />
                    </ModalBody>
                    <ModalFooter>
                        <Button size={'sm'} color={'white'} bg={'black'} mr={3} onClick={onClose}>
                            Poll Now
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};