import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems: []
}

const myCartSlice = createSlice({
    name: "mycart",
    initialState,
    reducers: {
        ADD_TO_CART: (state, actions) => {
            const findProductindex = state.cartItems.findIndex((item) => item.id === actions.payload.id)
            if (findProductindex >= 0) {
                state.cartItems[findProductindex].qty += 1;
            } else {
                state.cartItems.push({ ...actions.payload, qty: 1 })
                console.log('else active');
            }
        },

        DECRESS_QTY: (state, action) => {
            const findProductindex = state.cartItems.findIndex((item) => item.id === action.payload.id)
            if (state.cartItems[findProductindex].qty > 1) {
                state.cartItems[findProductindex].qty -= 1;
            } else if (state.cartItems[findProductindex].qty === 1) {
                const newcartItem = state.cartItems.filter((item) => item.id !== action.payload.id)
                state.cartItems = newcartItem;
            }
        },

        REMOVE_FROM_CART: (state, action) => {
            const newcartItem = state.cartItems.filter((item) => item.id !== action.payload.id)
            state.cartItems = newcartItem;
        },
        CLEAR_CART: (state, action) => {
            state.cartItems = []
        },
    }
});

export const { ADD_TO_CART, DECRESS_QTY, REMOVE_FROM_CART, CLEAR_CART } = myCartSlice.actions;
export const selectcartItems = (state) => state.mycart.cartItems;

export default myCartSlice.reducer;