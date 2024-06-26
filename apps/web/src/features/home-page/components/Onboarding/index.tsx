import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

export const Onboarding = () => {
    const navigateTo = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            // navigateTo('/dashboard')
        }, 10000)
    }, [])
    return (
        <div class="flex w-full max-h-screen overflow-hidden flex-wrap text-slate-800">
            <div class="flex w-full flex-col md:w-1/2">
                <div class="flex justify-center py-12 md:justify-start md:pl-12">
                    <a href="#" class="text-2xl font-bold text-blue-600"> Wobble . </a>
                </div>
                <div class="my-auto mx-auto flex flex-col justify-center pt-8 md:justify-start lg:w-[34rem]">
                    <div class="flex w-full flex-col rounded-2xl bg-white px-2 sm:px-14">
                        <div class="mx-auto w-full max-w-md pb-20 px-8 sm:px-0">
                            <div class="relative">
                                <div class="absolute left-0 top-2 h-0.5 w-full bg-gray-200" aria-hidden="true">
                                    <div class="absolute h-full w-1/3 bg-gray-900"></div>
                                    {/* <!-- change to w-2/3 for next step --> */}
                                    <div class="left absolute left-2/3 h-full w-1/3 bg-gradient-to-r from-gray-900"></div>
                                    {/* <!-- change to left-1/2 for next step --> */}
                                </div>
                                <ul class="relative flex w-full justify-between">
                                    <li class="text-left">
                                        <a class="flex h-5 w-5 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white" href="#">1</a>
                                    </li>
                                    <li class="text-left">
                                        <a class="flex h-5 w-5 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="#">2</a>
                                    </li>
                                    <li class="text-left">
                                        <a class="flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-xs font-semibold text-white" href="#">3</a>
                                    </li>
                                    <li class="text-left">
                                        <a class="flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-xs font-semibold text-white" href="#">4</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <h2 class="font-serif text-2xl font-semibold text-gray-700">How big is your company</h2>
                        <div class="mt-8 flex w-full flex-col pb-8">
                            <div class="relative mb-4">
                                <input class="peer hidden" id="radio_1" type="radio" name="radio" checked />
                                <span class="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-900"></span>
                                <label class="flex cursor-pointer flex-col rounded-2xl border border-gray-300 bg-slate-100/80 p-4 pr-8 sm:pr-16" for="radio_1">
                                    <span class="mb-2 text-lg font-semibold">Small Team</span>
                                    <p class="text-sm sm:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea mollitia corporis non fugiat ratione.</p>
                                </label>
                            </div>
                            <div class="relative mb-4">
                                <input class="peer hidden" id="radio_2" type="radio" name="radio" />
                                <span class="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-900"></span>
                                <label class="flex cursor-pointer flex-col rounded-2xl border border-gray-300 bg-slate-100/80 p-4 pr-8 sm:pr-16" for="radio_2">
                                    <span class="mb-2 text-lg font-semibold">Large Team</span>
                                    <p class="text-sm sm:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea mollitia corporis non fugiat ratione.</p>
                                </label>
                            </div>
                            <div class="my-4 space-y-3">
                                <label for="terms" class="flex space-x-4">
                                    <input id="terms" name="terms" type="checkbox" class="h-6 w-6 shrink-0 accent-gray-900" checked />
                                    <span id="terms-description" class="text-sm text-gray-600">I agree to the <a class="underline" href="#">Terms and Conditions</a>. Learn about our Privacy Policy and our measures to keep your data safe and secure.</span>
                                </label>
                            </div>

                            <button class="my-2 flex items-center justify-center rounded-md bg-gray-900 py-3 font-medium text-white">
                                Continue
                                <svg xmlns="http://www.w3.org/2000/svg" class="ml-4 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="relative hidden h-screen select-none flex-col justify-center bg-blue-600 bg-gradient-to-br md:flex md:w-1/2">
                <div class="py-16 px-8 text-white xl:w-[40rem]">
                    <span class="rounded-full bg-white px-3 py-1 font-medium text-blue-600">New Feature</span>
                    <p class="my-6 text-3xl font-semibold leading-10">Create animations with <span class="whitespace-nowrap py-2 text-cyan-300">drag and drop</span>.</p>
                    <p class="mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt necessitatibus nostrum repellendus ab totam.</p>
                    <a href="#" class="font-semibold tracking-wide text-white underline underline-offset-4">Learn More</a>
                </div>
                <img class="ml-8 w-11/12 max-w-lg rounded-lg object-cover" src="/images/SoOmmtD2P6rjV76JvJTc6.png" />
            </div>
        </div>

    )
}
