import { Divider, Progress } from '@chakra-ui/react'

export const PollAnswer = (
    { answer, percent, color }:
        { answer: string; percent: number, color: string }) => {
    return (
        <div className='p-1 bg-white shadow-xl w-full px-2 '>
            <div className='w-full flex justify-between space-x-36 px-5'>
                <p className='text-md my-1 font-lato font-bold text-gray-600'>{answer}</p>
                <p className='text-lg my-1 font-lato font-semibold text-black'>{percent} %</p>
            </div>
            <div className='px-4'>
                <Progress
                    rounded={'lg'}
                    colorScheme={color}
                    size='md'
                    value={percent} />
                    <p className='text-black font-lato py-1'>64 votes</p>
            </div >
            <Divider />
        </div >
    )
}
