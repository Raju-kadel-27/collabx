import { CastVoteModal } from './cast-vote-modal';
import { PollAnswer } from './poll-answer';
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Tag,
    TagLabel,
} from '@chakra-ui/react';

const answers = [
    { ans: 'Artificial Intelligence', percent: 50, color: 'green' },
    { ans: 'BlockChain', percent: 24, color: 'red' },
    { ans: 'Virtual Reality', percent: 68, color: 'blue' },
    { ans: 'Both a and c', percent: 18, color: 'yellow' },
];

const handlePollCard=()=>{
    con('in the message__info__client,,,gen')
    try {
        console.log('Handling polling of cards')
    } catch (error) {
        console.log(error)
    }
}

export const PollCard = () => {

    return (
        <div className='w-full overflow-y-auto bg-gray-50 p-2'>
            <div className='my-2 max-w-xl'>
                <Tag
                    size={'md'}
                    key={'md'}
                    borderRadius='full'
                    variant='solid'
                    bg={'cyan.600'}
                >
                    <TagLabel>Collabx Office Survey</TagLabel>
                </Tag>
                <h2 className='text-left text-gray-600 font-semibold text-lg font-lato'>
                    How do you prefer to reduce your carbon
                    footprint: Using public transport,
                    Carpooling, Biking, or Planting trees?
                </h2>
                <p className='text-gray-500'>
                    Asked by Manoj Gautam
                    <span className='mx-2'> || <strong>36 mins</strong> ago</span>
                </p>
                <div className='py-1'>
                    <Tag
                        size={'md'}
                        key={'md'}
                        mx={1}
                        borderRadius='full'
                        bg={'green.300'}
                    >
                        <TagLabel>Tech</TagLabel>
                    </Tag>
                    <Tag
                        size={'md'}
                        key={'mds'}
                        mx={1}
                        borderRadius='full'
                        bg={'red.300'}
                    >
                        <TagLabel>Programming</TagLabel>
                    </Tag>
                    <Tag
                        size={'md'}
                        key={'mad'}
                        mx={1}
                        borderRadius='full'
                        bg={'yellow.300'}
                    >
                        <TagLabel>Remote Jobs</TagLabel>
                    </Tag>
                </div>
            </div>

            <div className='py-4 w-full space-x-20 space-y-2'>
                <div className='grid grid-cols-2 space-y-2 gap-y-2 gap-x-3  max-w-3xl'>
                    {answers?.map((option) => (
                        <PollAnswer
                            color={option.color}
                            answer={option.ans}
                            percent={option.percent} />
                    ))}
                </div>
                <div>
                    <CastVoteModal />
                    <div className='my-8 max-w-lg flex space-x-3'>
                        <Stat className='px-20'>
                            <StatLabel>Votes</StatLabel>
                            <StatNumber>117</StatNumber>
                            <StatHelpText>
                                <StatArrow type='increase' />
                                23.36%
                            </StatHelpText>
                        </Stat>
                        <Stat>
                            <StatLabel>Clicked</StatLabel>
                            <StatNumber>45</StatNumber>
                            <StatHelpText>
                                <StatArrow type='decrease' />
                                9.05%
                            </StatHelpText>
                        </Stat>
                    </div>
                </div>
            </div>
        </div>
    )
}
