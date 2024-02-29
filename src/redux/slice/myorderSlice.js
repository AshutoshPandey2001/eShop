import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    myorders: []
}

const myorderSlice = createSlice({
    name: "myorder",
    initialState,
    reducers: {
        SET_MY_ORDER: (state, actions) => {
            console.log('Redux Myorder slice', actions.payload)
            state.myorders = actions.payload
        },

        REMOVE_MY_ORDER: (state, actions) => {
            console.log('Redux Myorder slice', actions.payload)
            state.myorders = []
        },
    }
});

export const { SET_MY_ORDER, REMOVE_MY_ORDER } = myorderSlice.actions;
export const selectMyOrder = (state) => state.myorder.myorders;

export default myorderSlice.reducer