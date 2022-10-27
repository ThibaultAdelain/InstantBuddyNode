import React from 'react'
import locationFunctions from '../features/loc/location'

function Map() {

    locationFunctions.sendLocation()
    const buddies = locationFunctions.getLocation()

  return (
    <div>
      <div className='text-white'>Watch the console and send an email...</div>
    </div>
  )
}

export default Map