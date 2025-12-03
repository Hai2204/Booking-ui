import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import roomReducer from "./slices/roomSlice"
import bookingReducer from "./slices/bookingSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    room: roomReducer,
    booking: bookingReducer,
  },
})

export default store
