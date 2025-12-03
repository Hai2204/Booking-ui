import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Booking {
  id: string
  roomId: string
  userId: string
  checkInDate: string
  checkOutDate: string
  totalPrice: number
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string
}

interface BookingState {
  bookings: Booking[]
  myBookings: Booking[]
  loading: boolean
  error: string | null
}

const initialState: BookingState = {
  bookings: [],
  myBookings: [],
  loading: false,
  error: null,
}

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload
    },
    setMyBookings: (state, action: PayloadAction<Booking[]>) => {
      state.myBookings = action.payload
    },
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload)
      state.myBookings.push(action.payload)
    },
    updateBooking: (state, action: PayloadAction<Booking>) => {
      const index = state.bookings.findIndex((b) => b.id === action.payload.id)
      if (index !== -1) {
        state.bookings[index] = action.payload
      }
    },
    deleteBooking: (state, action: PayloadAction<string>) => {
      state.bookings = state.bookings.filter((b) => b.id !== action.payload)
      state.myBookings = state.myBookings.filter((b) => b.id !== action.payload)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
})

export const { setBookings, setMyBookings, addBooking, updateBooking, deleteBooking, setLoading, setError } =
  bookingSlice.actions
export default bookingSlice.reducer
