// Service file to treat auth http requests
// axios is doing the same job as postman

import axios from 'axios'

const API_URL = '/user/'

// Update profile

const updateProfile = async (userData) => {
    const response = await axios.put(API_URL + 'updateProfile', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const updateService = {
    updateProfile,
}


export default updateService