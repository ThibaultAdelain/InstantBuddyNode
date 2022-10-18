import React from 'react'
import Button from '../Components/Button'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate} from 'react-router-dom'

function Home() {
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  const navigate = useNavigate()


  const onClickMap = (e) => {
    e.preventDefault()
    navigate('/map')
  }

  const onClickLogin = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  return (
        <div className='container mx-auto'>
            {user ? (                        
                      <div className='homeContainer'>
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
                      <div className='homeContainer'>
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