import React from 'react'
import {FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import {GiFallingBlob} from 'react-icons/gi'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)
    

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

  return (
    <header className='header'>
        <div className="hoverGray">
            <div className="text-3xl">
                <Link to='/'>
                    <GiFallingBlob />
                </Link>
            </div>
        </div>
        <ul>
            {user ? (
                <>
                    <li className='hoverGray'>
                        <Link to='/profile'>
                            <FaUser /> Profile
                        </Link>
                    </li>
                    <li className='hoverGray'>
                        <Link to='/' onClick={onLogout}>
                            <FaSignOutAlt /> Logout
                        </Link>
                    </li>
                </>

                    ) : (
                    <>
                    <li className='hoverGray'>
                        <Link to='/login'>
                            <FaSignInAlt /> Login
                        </Link>
                    </li>
                    <li className='hoverGray'>
                        <Link to='/Register'>
                            <FaUser /> Register
                        </Link>
                    </li>
            </>
            )}

        </ul>
    </header>
  )
}

export default Header