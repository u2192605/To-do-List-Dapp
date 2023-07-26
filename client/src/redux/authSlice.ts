import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../Types/User";

interface credentialsStateType {
    user: User,
    token: string,
}


const initialState: credentialsStateType =
    JSON.parse(localStorage.getItem('user') as string) ||
    { user: { name: '', _id: '', gender: '', email: '' }, token: '' }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: User, token: string }>) => {
            state.token = action.payload.token
            state.user = action.payload.user
        }
    },

})

export const authReducer = authSlice.reducer
export const { setCredentials } = authSlice.actions