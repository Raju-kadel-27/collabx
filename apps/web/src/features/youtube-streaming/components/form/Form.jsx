import { Button } from '@chakra-ui/react'
import React from 'react'

const Form = () => {
    return (

        <div className='p-8 mt-20 shadow-2xl border-slate-700 border-[0px] bg-slate-  rounded-lg'>
            <div className='py-4 pb-8 '>
                <h2 className='font-extrabold text-xl text-red-500'>RTMP Streaming</h2>
            </div>
            <form class="w-full max-w-lg">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2" for="grid-first-name">
                            Stream Name
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-400 border rounded py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="first-stream" />
                        {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2" for="grid-last-name">
                            STREAM URL
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-400 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />

                        {/* <p class="text-green-500 font-semibold mt-3 text-xs italic">Connection is successfull.</p> */}
                    </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2" for="grid-password">
                            STREAM KEY
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-400 border border-gray-200 rounded py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />

                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-2">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2" for="grid-city">
                            IP ADDRESS
                        </label>
                        <input disabled class="appearance-none block w-full bg-gray-200 text-gray-400 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" value={'0.0.0.0'} />
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" for="grid-state">
                            CONNECTION
                        </label>
                        <div class="relative">
                            <input disabled class="appearance-none block w-full bg-gray-200 border bordergray-200 rounded py-1 px-4 leading-tight focus:outline-none " id="grid-zip" type="text" placeholder="90210" value='' />
                        </div>
                    </div>

                </div>

                <Button isLoading={false} width={'full'} colorScheme='red' color={'white'} marginY={'6'} mt={10} marginLeft={'auto'}>
                    Setup RTMP
                </Button>
            </form>
        </div>

    )
}

export default Form