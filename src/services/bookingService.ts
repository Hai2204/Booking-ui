import api from "lib/api"

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
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
}

export const bookingService = {
  createBooking: async (payload: CreateBookingPayload) => {
    const response = await api.post("/api/booking", payload)
    return response.data
  },

  getUserBookings: async (userId: number) => {
    const response = await api.get(`/api/booking?userId=${userId}`)
    return response.data
  },

  getAllBookings: async () => {
    const response = await api.get("/api/booking")
    return response.data
  },

  updateBookingStatus: async (bookingId: number, status: UpdateBookingStatusPayload) => {
    const response = await api.put(`/api/booking/${bookingId}`, status)
    return response.data
  },

  cancelBooking: async (bookingId: number) => {
    const response = await api.delete(`/api/booking/${bookingId}`)
    return response.data
  },

  getBookingStats: async () => {
    const response = await api.get("/api/booking/stats")
    return response.data
  },
}