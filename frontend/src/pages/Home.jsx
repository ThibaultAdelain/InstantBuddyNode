import React from 'react'
import Button from '../Components/Button'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate} from 'react-router-dom'
import { getMe, reset } from '../features/auth/authSlice'
import axios from 'axios'

function Home() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)

  // getMe

  const API_URL = '/user/'

  const getMe = async () => {
    const response = await axios.get(API_URL + 'me')

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
  }

  if(!user) {
    getMe()
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function reloadAfterLogin() {
    await sleep(100)
    if ((localStorage.getItem('user')) && (!localStorage.getItem('hasRefreshed'))) {
      localStorage.setItem('hasRefreshed', true)
      window.location.reload()
    }
  }

  reloadAfterLogin()

  async function reloadAfterLogout() {
    await sleep(100)
    if (localStorage.getItem('reloadAfterLogout')) {
      localStorage.removeItem('reloadAfterLogout')
      window.location.reload()
    }
  }

  reloadAfterLogout()



  const onClickMap = (e) => {
    e.preventDefault()
    navigate('location/map')
  }

  const onClickLogin = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  return (
        <div className='container mx-auto homeContainer'>
            {user ? (                        
                      <div>
                      <section className='heading'>
                          <h1>
                              Instant Buddy
                          </h1>
                            <h3>Find a Buddy immediatly</h3>
                      </section>
                      <div className='homeText center'>
                          <p> Welcome {user.name} !</p>
                          <p> Is there a Buddy around you ?</p>
                        </div>
                        <section className='center marginButton' onClick={onClickMap}>
                            <Button type='submit' text="Find your Buddy now !"/>
                        </section> 
                      </div>
                    ) : (
                      <div>
                      <section className='heading'>
                          <h1>
                              Instant Buddy
                          </h1>
                            <h3>Find a Buddy immediatly</h3>
                      </section>
                      <div className='homeText center'>
                          <p>Is there a Buddy around you ?</p>
                          <p></p> 
                        </div>
                        <section className='center marginButton' onClick={onClickLogin}>
                            <Button type='submit' text="Find your Buddy now !"/>
                        </section> 
                      </div>
            )}

        </div>
  )
}

export default Home