import React from 'react'
import axios from 'axios';
import {toast} from 'react-toastify'
import { setTheme } from 'colors';

function Map() {

    const sendLocation = async () => {
        
        const longitude = 0
        const latitude = 0
        
        navigator.geolocation.getCurrentPosition((position) => {
            const longitude = position.coords.longitude
            const latitude = position.coords.latitude

            console.log("longitude : ", longitude)
            console.log("latitude : ", latitude)
        });

        const response = await axios.post('/user/location', {"longitude": longitude, "latitude": latitude})
    
        return response.data
    }

    sendLocation()

    toast.error('Buddy not Found 😮', {
        theme: 'dark',
        position: 'bottom-right'
    })

  return (
    <div>
    </div>
  )
}

export default Map