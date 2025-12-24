import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { bookingService } from "../../services/bookingService"
import { RootState } from "../store"


interface BookingState {
  bookings: Booking[]
  userBookings: Booking[]
  isLoading: boolean
  error: string | null
}

const initialState: BookingState = {
  bookings: [],
  userBookings: [],
  isLoading: false,
  error: null,
}

interface CreateBookingPayload {
  roomId: number
  userId: number
  checkInDate: string
  checkOutDate: string
  guests: number
  totalPrice: number
  specialRequests?: string
}

interface UpdateBookingStatusPayload {
  bookingId: number
  status: Booking['status']
}

export const fetchAllBookings = createAsyncThunk("booking/fetchAllBookings", async (_, { rejectWithValue }) => {
  try {
    const response = await bookingService.getAllBookings()

    if (response.success) {
      return Array.isArray(response.data) ? response.data : [response.data]
    }
    return rejectWithValue(response.message)
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const createBooking = createAsyncThunk("booking/createBooking", async (payload: CreateBookingPayload, { rejectWithValue }) => {
  try {
    const response = await bookingService.createBooking(payload)
    if (response.success) {
      return response.data
    }
    return rejectWithValue(response.message)
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Booking failed")
  }
})

export const fetchUserBookings = createAsyncThunk("booking/fetchUserBookings", async (userId: number, { rejectWithValue }) => {
  try {
    const response = await bookingService.getUserBookings(userId)
    if (response.success) {
      return Array.isArray(response.data) ? response.data : [response.data]
    }
    return rejectWithValue(response.message)
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})



export const updateBookingStatus = createAsyncThunk(
  "booking/updateBookingStatus",
  async ({ bookingId, status }: UpdateBookingStatusPayload, { rejectWithValue }) => {
    try {
      const response = await bookingService.updateBookingStatus(bookingId, { status })
      if (response.success) {
        return { bookingId, status }
      }
      return rejectWithValue(response.message)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const cancelBooking = createAsyncThunk("booking/cancelBooking", async (bookingId: number, { rejectWithValue }) => {
  try {
    const response = await bookingService.cancelBooking(bookingId)
    if (response.success) {
      return bookingId
    }
    return rejectWithValue(response.message)
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false
        state.userBookings.push(action.payload)
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(fetchUserBookings.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.isLoading = false
        state.userBookings = action.payload
      })
      .addCase(fetchAllBookings.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.isLoading = false
        state.bookings = action.payload
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        const booking = state.bookings.find((b) => b.id === action.payload.bookingId)
        if (booking) {
          booking.status = action.payload.status
        }
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.userBookings = state.userBookings.filter((b) => b.id !== action.payload)
      })
  },
})

export const { clearError } = bookingSlice.actions
export const getBookings = (state: RootState) => state.booking.bookings
export default bookingSlice.reducer