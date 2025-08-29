import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice"
let store = configureStore({
     reducer:{
        auth:AuthReducer
     }
})

export default store