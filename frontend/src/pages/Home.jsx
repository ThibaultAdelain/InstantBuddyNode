import React from 'react'
import Button from '../Components/Button'
import { toast } from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'

const onClick = () => {
  toast.dark('Function coming')
}

function Home() {
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)

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
                        <section className='center marginButton' onClick={onClick}>
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
                        <section className='center marginButton' onClick={onClick}>
                            <Button type='submit' text="Find your Buddy now !"/>
                        </section> 
                      </div>
            )}

        </div>
  )
}

export default Home