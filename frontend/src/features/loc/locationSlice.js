import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import locationFunctions from './location'

const initialState = {
    buddies: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const buddiesAround = createAsyncThunk('location/map', async (thunkAPI) => {
    try {
        
        await locationFunctions.sendLocation()
        return await locationFunctions.getBuddies()

    } catch (error) {
        const message = (error.message && error.response.data && error.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    // extraReducers : for asyn func. Come with redux toolkit
    // Cool because with don't have to handle manually case, we can write .pending, .fulfilled...
    extraReducers: (builder) => {
        builder 
        .addCase(buddiesAround.pending, (state) => {
            state.isLoading = true
        } )
        .addCase(buddiesAround.fulfilled, (state, action) => {
            state.isSuccess = true
            state.isLoading = false
            state.buddies = action.payload
            // action.payload => user sent back by the server
        } )
        .addCase(buddiesAround.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            // action.payload => thunkAPI.rejectWithValue(message)
            state.buddies = []
        } )
    }
})

export const {reset} = locationSlice.actions
export const locationInitialState = initialState
export default locationSlice.reducer