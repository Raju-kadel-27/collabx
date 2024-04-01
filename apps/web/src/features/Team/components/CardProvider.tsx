import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    Text
} from '@chakra-ui/react';

interface CardProps {
    title: string;
    body: string;
    size: 'sm' | 'md' | 'lg';
    showEdit?: boolean;
}

export const CardProvider = ({ title, body, size, showEdit }: CardProps) => {
    return (
        <Card pr={4} size={size}>
            <div className='flex justify-between items-center'>
                <div>
                    <CardHeader>
                        <Heading className='font-lato' size='sm'> {title}</Heading>
                    </CardHeader>
                    <CardBody mt={'-30px'}>
                        <Text className='font-lato'>{body}</Text>
                    </CardBody>
                </div>
                <div>
                    {showEdit ?
                        (<p className='text-blue-600 hover:cursor-pointer font-lato'>Edit</p>)
                        :
                        null
                    }
                </div>
            </div>
        </Card>
    )
}
