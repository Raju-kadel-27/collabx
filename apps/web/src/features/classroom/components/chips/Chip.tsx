import React from 'react'

const UserChip = ({ color }) => (

    <div class={`flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full bg-${color}-100 border`}>
        <div slot="avatar">
            <div class="flex relative w-4 h-4 bg-orange-500 justify-center items-center m-1 mr-2 ml-0 my-0 text-xs rounded-full">
                <img class="rounded-full" alt="A" src="https://randomuser.me/api/portraits/women/68.jpg" /> </div>
        </div>

        <div class="text-xs font-normal leading-none max-w-full flex-initial">
            Prassidha Chapagain
        </div>

        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x cursor-pointer hover:text-indigo-400 rounded-full w-4 h-4 ml-2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </div>
    </div>
)

export const Chip = () => {
    return (
        <div class="p-5 ">
            <div class="flex flex-wrap justify-start  px-4 mx-auto">
                <UserChip color='blue' />
                <UserChip color='blue' />
                <UserChip color='red' />
                <UserChip color='red' />
                <UserChip color='red' />
                <UserChip color='yellow' />
                <UserChip color='blue' />
                <UserChip color='red' />
                <UserChip color='yellow' />
                <UserChip color='red' />
                <UserChip color='yellow' />
                <UserChip color='blue' />
                <UserChip color='red' />
                <UserChip color='yellow' />
            </div>
        </div>
    )
}
