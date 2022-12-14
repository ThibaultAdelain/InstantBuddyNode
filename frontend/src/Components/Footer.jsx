import React from 'react'
import {Link} from 'react-router-dom'

function Footer() {
  return (
    <div className='containerFooter'>
        <footer className="p-4 rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 responsiveHide">Website made by Thibault Adelain
            </span>
            <ul className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <Link to="/about" className="mr-4 hover:underline md:mr-6" id="about">About</Link>
                </li>
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6 responsiveHide">Privacy Policy</a>
                </li>
                <li>
                    <a href="https://opensource.org/licenses/MIT" className="mr-4 hover:underline md:mr-6" id="licensing">Licensing</a>
                </li>
                <li>
                    <a href="https://github.com/ThibaultAdelain" className="hover:underline" id="contact">Contact</a>
                </li>
            </ul>
        </footer>
    </div>
  )
}

export default Footer