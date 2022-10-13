import React from 'react'
import Button from '../Components/Button'
import { toast } from 'react-toastify'

const onClick = () => {
  toast.dark('Function coming')
}

function Home() {
  return (
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
  )
}

export default Home