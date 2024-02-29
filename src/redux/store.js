import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice';
import myorderSlice from './slice/myorderSlice';
import mycartsilce from './slice/cartSlice'
const rooReducer = combineReducers({
    auth: authReducer,
    myorder: myorderSlice,
    mycart: mycartsilce
}

)

const store = configureStore({
    reducer: rooReducer,
})

export default store;