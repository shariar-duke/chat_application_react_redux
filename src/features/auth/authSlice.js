import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: undefined,
    user: undefined,
}

const authSlice = createSlice({
    name: "auth",
    initialState, 
    reducers: {
        userLoggedIn: (state, action) => {
            state.accessToken = action.payload.accessToken; // Set accessToken
            state.user = action.payload.user;               // Set user
        },
        userLoggedOut: (state) => {
            state.accessToken = undefined; // Clear accessToken
            state.user = undefined;        // Clear user
        },
    }
})

// Correct export of actions
export const { userLoggedIn, userLoggedOut } = authSlice.actions;

// Correct export of reducer
export default authSlice.reducer;
