import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {useState, useEffect} from 'react'
import { toast } from 'react-toastify'
import { reset } from '../features/auth/authSlice'
import Spinner from '../Components/Spinner'
import Button from '../Components/Button'

function Profile() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])


    const onClickUpdateProfile = (e) => {
        e.preventDefault()
        navigate('/profile/update')
    }

    const onClickLogin = (e) => {
        e.preventDefault()

        navigate('/login')

    }

    if (isLoading) {
        return <Spinner />
    }

    return (
    <div>
        {user ? (
            <>
                <section className='heading containerProfile'>
                    <h1>
                        Profile
                    </h1>
                    </section>


                    <div className="containerBody">
                    <div className='containerBox textSpace'>
                        <p>Name : {user.name}</p>
                        <p>Email : {user.email}</p>
                        <p>Description : empty</p>
                    </div>
                    <section className='form center'>
                    <form onClick={onClickUpdateProfile}>
                        <div className="form-group marginButton">
                            <Button text="Update profile"/>
                        </div>
                    </form>
                    </section>
                </div>
            </>
        ) : (<>
        <div className='login'>
            <section className='heading'>
                <p>Please login to access your profile</p>
            </section>
            <section className='form center'>
                <form onClick={onClickLogin}>
                    <div className="form-group marginButton">
                        <Button text="Login"/>
                    </div>
                </form>
            </section>
        </div>
        </>
        )}
    </div>
  )
}

export default Profile