import React from 'react'

function Footer() {
  return (
    <div className='containerFooter'>
        <footer class="p-4 rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">Website made by Thibault Adelain
            </span>
            <ul class="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <a href="https://github.com/ThibaultAdelain" class="mr-4 hover:underline md:mr-6 ">About</a>
                </li>
                <li>
                    <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" class="mr-4 hover:underline md:mr-6">Licensing</a>
                </li>
                <li>
                    <a href="https://github.com/ThibaultAdelain" class="hover:underline">Contact</a>
                </li>
            </ul>
        </footer>
    </div>
  )
}

export default Footer