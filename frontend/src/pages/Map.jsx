import React from 'react'
import {toast} from 'react-toastify'
import locationFunctions from '../features/loc/location'

function Map() {

    locationFunctions.sendLocation()

    toast.error('Buddy not Found 😮', {
      theme: 'dark',
      position: 'bottom-right'
  })

  return (
    <div>
      <div className='text-white'>Coming soon...</div>
    </div>
  )
}

export default Map