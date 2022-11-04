// Service file to treat auth http requests
// axios is doing the same job as postman

import axios from 'axios'

const API_URL = '/user/'

// Register user 
// post the form to the server
// pick up the response (mainly session cookie), and save it to local storage

const register = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if (response.data && !(JSON.stringify(response.data.stack))) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Logout user
const logout = async () => {
    await axios.get(API_URL + 'logout')
    localStorage.removeItem('user')
    localStorage.removeItem('buddies')
}

const authService = {
    register,
    logout,
    login
}


export default authService