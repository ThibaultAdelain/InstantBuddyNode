import React from 'react'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../Components/Spinner'

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

        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
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
        <>
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
                    <input type="text" className='form-control' id='email' name='email' value={email} placeholder='Email' onChange={onChange}/>
                </div>  
                <div className="form-group">
                    <input type="password" className='form-control' id='password' name='password' value={password} placeholder='Password' onChange={onChange}/>
                </div>
                <div className="form-group">
                    <input type="password" className='form-control' id='confirmPassword' name='confirmPassword' value={confirmPassword} placeholder='Confirm password' onChange={onChange}/>
                </div>  
                <div className="form-group">
                    <button type="submit" className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'>
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Register
                        </span>
                    </button>
                </div>
            </form>
        </section>
        </>
    )
}

export default Register