import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {useState, useEffect} from 'react'
import { toast } from 'react-toastify'
import { reset } from '../features/auth/authSlice'
import { updateProfile } from '../features/auth/authSlice'
import Spinner from '../Components/Spinner'
import Button from '../Components/Button'

function UpdateProfile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  try {
    var [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        description: user.description,
      })
  } catch {
    var [formData, setFormData] = useState({
        name: "",
        email: "",
        description: "",
      })
  }


  const { name, email, description } = formData
  
  useEffect(() => {
      if (isError) {
          toast.error(message)
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

    if (!name || !email || !description){
        toast.error('Please add all fields', {
            theme:'dark',
            position: 'bottom-right'
        })
    }

    const userData = {
        name,
        email,
        description
    }

    dispatch(updateProfile(userData))
    navigate('/profile')
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
                    <div className='containerBox textSpace center'>
                      <section className='form'>
                          <form onSubmit={onSubmit}>
                              <div className="form-group">
                                  <input type="text" className='form-control' id='name' name='name' value={name} placeholder='Name' onChange={onChange}/>
                              </div>
                              <div className="form-group">
                                  <input type="email" className='form-control' id='email' name='email' value={email} placeholder='Email' onChange={onChange}/>
                              </div>  
                              <div className="form-group">
                                  <input type="text" className='form-control' id='description' name='description' value={description} placeholder='Description' onChange={onChange}/>
                              </div>
                              <div className="form-group marginButton">
                                  <Button type="submit" text="Update profile"/>
                              </div>
                          </form>
                      </section>
                    </div>
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

export default UpdateProfile