import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {useState, useEffect} from 'react'
import { toast } from 'react-toastify'
import { reset } from '../features/auth/authSlice'
import Spinner from '../Components/Spinner'
import Button from '../Components/Button'

function Profile() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])


    const onClick = (e) => {
        e.preventDefault()

        navigate('/profile/update')

    }

    if (isLoading) {
        return <Spinner />
    }

    return (
    <div>
    <section className='heading'>
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
        <form onClick={onClick}>
            <div className="form-group marginButton">
                <Button text="Update profile"/>
            </div>
        </form>
    </section>
    </div>
    </div>
  )
}

export default Profile