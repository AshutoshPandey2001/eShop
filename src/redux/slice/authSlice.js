import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggesIn: false,
    email: null,
    userName: null,
    userId: null,

    adminLoggedin: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_ACTIVE_USER: (state, actions) => {
            console.log('redux', actions.payload)
            const { email, userName, userID } = actions.payload;
            state.isLoggesIn = true;
            state.email = email;
            state.userName = userName;
            state.userId = userID;
        },

        REMOVE_ACTIVE_USER: (state, actions) => {
            console.log('redux', actions.payload)
            state.isLoggesIn = false;
            state.email = null;
            state.userName = null;
            state.userId = null;
        },
        SET_ADMIN_LOGIN: (state, action) => {
            state.adminLoggedin = true
        }
    }
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER, SET_ADMIN_LOGIN } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggesIn;
export const selectUserName = (state) => state.auth.userName;
export const selectEmail = (state) => state.auth.email;
export const selectUserId = (state) => state.auth.userId;
export const selectAdminLoggedin = (state) => state.auth.adminLoggedin
export default authSlice.reducer;