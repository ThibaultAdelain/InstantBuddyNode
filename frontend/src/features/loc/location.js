import axios from 'axios';

const sendLocation = async () => {
    
    navigator.geolocation.getCurrentPosition(async (position) => {
        const longitude = position.coords.longitude
        const latitude = position.coords.latitude

        const userLocation = {longitude: longitude, latitude: latitude}

        const response = await axios.post('/user/location', userLocation)
        console.log(response.data)
        return response.data
    });
}

const getLocation = async () => {
    
    const response = await axios.get('/user/buddyFinder')
    console.log(response.data)
    return response.data
}

const locationFunctions = {
    sendLocation,
    getLocation
}

export default locationFunctions