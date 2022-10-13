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
        <div>
            {user ? (                        
                      <div className='homeContainer'>
                      <section className='heading'>
                          <h1>
                              Instant Buddy
                          </h1>
                            <h3>Find a Buddy immediatly</h3>
                      </section>
                      <div className='homeText'>
                          <p> Welcome {user.name}.</p>
                          <p> See who is around you. Meet now.</p>
                          <p>Easy. Fast. Free.</p> 
                        </div>
                        <section className='center marginButton' onClick={onClick}>
                            <Button type='submit' text="Find a Buddy"/>
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
                      <div className='homeText'>
                          <p>See who is around you. Meet now.</p>
                          <p>Easy. Fast. Free.</p> 
                        </div>
                        <section className='center marginButton' onClick={onClick}>
                            <Button type='submit' text="Find a Buddy"/>
                        </section> 
                      </div>
            )}

        </div>
  )
}

export default Home