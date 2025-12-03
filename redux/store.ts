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

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
