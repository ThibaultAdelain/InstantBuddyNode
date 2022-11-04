import React from 'react'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../Components/Spinner'
import Button from '../Components/Button'

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const { name, email, password, confirmPassword } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    
    useEffect(() => {
        if (isError) {
            toast.error(message, {theme:'dark'})
        }

        if (isSuccess || user) {
            navigate('/')
            navigate(0)
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (!name || !email || !password || !confirmPassword){
            toast.error('Please add all fields', {theme:'dark', position: 'bottom-right'})
        }
        
        if (password !== confirmPassword) {
            toast.error('Passwords do not match', {theme:'dark', position: 'bottom-right'})
        } else {
            const userData = {
                name,
                email,
                password
            }

            dispatch(register(userData))
        }

    }

    if (isLoading) {
        return <Spinner />
    }

    return(
        <div className='register containerRegister'>
        <section className='heading'>
            <h1>
                Register
            </h1>
            <p>Create an account</p>
        </section>

        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" className='form-control' id='name' name='name' value={name} placeholder='Name' onChange={onChange}/>
                </div>
                <div className="form-group">
                    <input type="email" className='form-control' id='email' name='email' value={email} placeholder='Email' onChange={onChange}/>
                </div>  
                <div className="form-group">
                    <input type="password" className='form-control' id='password' name='password' value={password} placeholder='Password' onChange={onChange}/>
                </div>
                <div className="form-group">
                    <input type="password" className='form-control' id='confirmPassword' name='confirmPassword' value={confirmPassword} placeholder='Confirm password' onChange={onChange}/>
                </div>  
                <div className="form-group marginButton">
                    <Button type="submit" text="Register"/>
                </div>
            </form>
        </section>
        </div>
    )
}

export default Register