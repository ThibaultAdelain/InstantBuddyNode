import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {useState, useEffect} from 'react'
import { toast } from 'react-toastify'
import { reset } from '../features/auth/authSlice'
import Spinner from '../Components/Spinner'
import Button from '../Components/Button'

function ErrorPlsLogin() {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onClickLogin = (e) => {
        e.preventDefault()

        navigate('/login')

    }

    if (isLoading) {
        return <Spinner />
    }

    return (
    <div>
        <>
        <div className='login'>
            <section className='heading'>
                <p>Please login to access this feature</p>
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
    </div>
  )
}

export default ErrorPlsLogin