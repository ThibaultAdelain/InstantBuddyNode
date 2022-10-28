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
          toast.success("Wouhou ! See the console →", {theme: "dark", position: "bottom-right"})

          let buddyList = []
          buddies.buddies[0].forEach(user => {
            buddyList.push(user.email)
            console.log(user.email)
            return user.email
          })
        }

        else {
          toast("Nobody around, keep looking...", {theme: "dark", position: "bottom-right", type:"info"})
        }
       
      } catch {
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



  return (
    <div>
     <section className='center marginButton' onClick={onClick}>
         <Button type='submit' text="Find your Buddy now !"/>
     </section>
    </div>
  )
}

export default Map