import React from 'react'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../Components/Spinner'
import Button from '../Components/Button'

function Login() {

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

        if (!email || !password){
            toast.error('Please add all fields', {theme:'dark'})
        }

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner />
    }

    return(
        <div className='login'>
        <section className='heading'>
            <h1>
                Login
            </h1>
            <p>Connect to your account</p>
        </section>

        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="email" className='form-control' id='email' name='email' value={email} placeholder='Email' onChange={onChange}/>
                </div>  
                <div className="form-group">
                    <input type="password" className='form-control' id='password' name='password' value={password} placeholder='Password' onChange={onChange}/>
                </div>
                <div className="form-group marginButton">
                    <Button type="submit" text="Login"/>
                </div>
            </form>
        </section>
        </div>
    )
}

export default Login