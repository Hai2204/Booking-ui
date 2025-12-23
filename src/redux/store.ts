import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import roomReducer from "./slices/roomSlice"
import bookingReducer from "./slices/bookingSlice"
import userReducer from "./slices/userSlice"
import partnerReducer from "./slices/partnerSlice"


export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    room: roomReducer,
    booking: bookingReducer,
    partner: partnerReducer,
  },
})


// RootState: type cho useSelector
export type RootState = ReturnType<typeof store.getState>

// AppDispatch: type cho useDispatch
export type AppDispatch = typeof store.dispatch

export default store
