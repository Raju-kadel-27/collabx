import React from 'react'

const BeautifulCard = () => {
  return (
    <>
<div class="flex items-center justify-center min-h-screen bg-gray-200">
    <div aria-label="card" class="p-8 rounded-3xl bg-white max-w-sm w-full">
      <div aria-label="header" class="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 h-8 shrink-0"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"></path>
        </svg>
        <div class="space-y-0.5 flex-1">
          <h3
            class="font-medium text-lg tracking-tight text-gray-900 leading-tight"
          >
            AI Power Analytics
          </h3>
          <p class="text-sm font-normal text-gray-400 leading-none">
            Daily usage
          </p>
        </div>
        <a
          href="/"
          class="inline-flex items-center shrink-0 justify-center w-8 h-8 rounded-full text-white bg-gray-900 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M17 7l-10 10"></path>
            <path d="M8 7l9 0l0 9"></path>
          </svg>
        </a>
      </div>
      <div aria-label="content" class="mt-9 grid gap-2.5">
        <a href="#">
          <div
            class="flex items-center space-x-4 p-3.5 rounded-full bg-gray-100"
          >
            <span
              class="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M8 16a3 3 0 0 1 -3 3"></path>
                <path d="M16 16a3 3 0 0 0 3 3"></path>
                <path d="M12 16v4"></path>
                <path
                  d="M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"
                ></path>
                <path d="M7 13v-3a1 1 0 0 1 1 -1h8a1 1 0 0 1 1 1v3"></path>
              </svg>
            </span>
            <div class="flex flex-col flex-1">
              <h3 class="text-sm font-medium">Air Conditioner</h3>
              <div class="divide-x divide-gray-200 mt-auto">
                <span
                  class="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0"
                  >2 unit</span
                >
                <span
                  class="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0"
                  >18kWh</span
                >
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 shrink-0"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M9 6l6 6l-6 6"></path>
            </svg>
          </div>
        </a>
        <a href="#">
          <div
            class="flex items-center space-x-4 p-3.5 rounded-full bg-gray-100"
          >
            <span
              class="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M3 13m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"
                ></path>
                <path d="M17 17l0 .01"></path>
                <path d="M13 17l0 .01"></path>
                <path d="M15 13l0 -2"></path>
                <path d="M11.75 8.75a4 4 0 0 1 6.5 0"></path>
                <path d="M8.5 6.5a8 8 0 0 1 13 0"></path>
              </svg>
            </span>
            <div class="flex flex-col flex-1">
              <h3 class="text-sm font-medium">Wi-Fi Router</h3>
              <div class="divide-x divide-gray-200 mt-auto">
                <span
                  class="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0"
                  >1 unit</span
                >
                <span
                  class="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0"
                  >8kWh</span
                >
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 shrink-0"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M9 6l6 6l-6 6"></path>
            </svg>
          </div>
        </a>
        <a href="#">
          <div
            class="flex items-center space-x-4 p-3.5 rounded-full bg-gray-100"
          >
            <span
              class="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10z"
                ></path>
                <path d="M7 20h10"></path>
                <path d="M9 16v4"></path>
                <path d="M15 16v4"></path>
              </svg>
            </span>
            <div class="flex flex-col flex-1">
              <h3 class="text-sm font-medium">Smart Tv</h3>
              <div class="divide-x divide-gray-200 mt-auto">
                <span
                  class="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0"
                  >2 unit</span
                >
                <span
                  class="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0"
                  >12kWh</span
                >
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 shrink-0"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M9 6l6 6l-6 6"></path>
            </svg>
          </div>
        </a>
        <a href="#">
          <div
            class="flex items-center space-x-4 p-3.5 rounded-full bg-gray-100"
          >
            <span
              class="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M7.502 19.423c2.602 2.105 6.395 2.105 8.996 0c2.602 -2.105 3.262 -5.708 1.566 -8.546l-4.89 -7.26c-.42 -.625 -1.287 -.803 -1.936 -.397a1.376 1.376 0 0 0 -.41 .397l-4.893 7.26c-1.695 2.838 -1.035 6.441 1.567 8.546z"
                ></path>
              </svg>
            </span>
            <div class="flex flex-col flex-1">
              <h3 class="text-sm font-medium">Humidifier</h3>
              <div class="divide-x divide-gray-200 mt-auto">
                <span
                  class="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0"
                  >1 unit</span
                >
                <span
                  class="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0"
                  >2kWh</span
                >
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 shrink-0"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M9 6l6 6l-6 6"></path>
            </svg>
          </div>
        </a>
      </div>
    </div>
  </div>
    </>
  )
}

export default BeautifulCard