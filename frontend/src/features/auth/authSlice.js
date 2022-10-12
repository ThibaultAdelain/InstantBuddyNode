import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

//Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.message && error.response.data && error.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})
 
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    // extraReducers : for asyn func. Come with redux toolkit
    // Cool because with don't have to handle manually case, we can write .pending, .fulfilled...
    extraReducers: (builder) => {
        builder 
        .addCase(register.pending, (state) => {
            state.isLoading = true
        } )
        .addCase(register.fulfilled, (state, action) => {
            state.isSuccess = true
            state.isLoading = false
            state.user = action.payload
            // action.payload => user sent back by the server
        } )
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            // action.payload => thunkAPI.rejectWithValue(message)
            state.user = null
        } )
        .addCase(logout.fulfilled, (state) => {
            state.user = null
        } )
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer