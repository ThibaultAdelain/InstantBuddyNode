import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { toast } from 'react-toastify'
import { buddiesAround, reset, locationInitialState } from '../features/loc/locationSlice'
import Spinner from '../Components/Spinner'
import Button from '../Components/Button'
import { useNavigate } from 'react-router-dom'



function Map() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { buddies, isLoading, isError, isSuccess, message } = useSelector((state) => state.location)

  useEffect(() => {

    if (isError) {
      toast.error(message, {theme: "dark"})
    }

    if (isSuccess) {
      try {
        if (buddies.buddies[0][0].email){
          toast.success("Wouhou !", {theme: "dark", position: "bottom-right"})
          
          buddies.buddies[0].forEach(user => {
            console.log(user.email)
            console.log(user.updatedAt)
            return user.email
          })

          function appendBuddies(data) {
            var mainContainer = document.getElementById("myBuddies");
            for (var i = 0; i < data.length; i++) {
              var li = document.createElement("li");
              li.innerHTML = 'Email: ' + data[i].email + ' ; See the ' + data[i].updatedAt.slice(0,10) + ' at ' + data[i].updatedAt.slice(11,16) + ' GMT.';
              mainContainer.appendChild(li);
            }
          }

          appendBuddies(buddies.buddies[0])
          

        } else {
          toast("Nobody around, keep looking...", {theme: "dark", position: "bottom-right", type:"info"})
        }
       
      } catch {
        toast("Nobody around, keep looking...", {theme: "dark", position: "bottom-right", type:"info"})
        console.log("Please click again...")
        navigate("/location/map")
      }

    }

    dispatch(reset())
    
  }, [buddies, isError, isSuccess, isLoading, message, dispatch])

  const onClick = (e) => {
    e.preventDefault()

    dispatch(buddiesAround())
    }

  if (isLoading) {
    return <Spinner />
  }

  document.getElementById('root')
  return (
    <div>
     <section className='center marginButton' onClick={onClick}>
         <Button type='submit' text="Find your Buddy now !"/>
     </section>
     <div>
      <div className='containerBox textSpace'>
          <p>Make a contact, send a message !</p>
          <ul id="myBuddies" className='text-white'></ul>
       </div>
     </div>
    </div>
  )
}

export default Map