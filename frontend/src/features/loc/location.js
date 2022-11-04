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

const getBuddies = async () => {

    localStorage.setItem("buddies", "null")
    
    const response = await axios.get('/user/buddyFinder')

    if (response.data && !(JSON.stringify(response.data.stack))) {
        localStorage.setItem("buddies", JSON.stringify(response.data))
    }
    console.log(response.data)
    return response.data
}

const locationFunctions = {
    sendLocation,
    getBuddies
}

export default locationFunctions