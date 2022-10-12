import React from 'react'
import {FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import {GiFallingStar} from 'react-icons/gi'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <header className='header'>
        <div className='logo'>
            <Link to='/'>
                <GiFallingStar /> Home
            </Link>
        </div>
        <ul>
            <li>
                <Link to='/login'>
                    <FaSignInAlt /> Login
                </Link>
            </li>
            <li>
                <Link to='/Register'>
                    <FaUser /> Register
                </Link>
            </li>
        </ul>
    </header>
  )
}

export default Header