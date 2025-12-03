import api from "./api"

export const bookingService = {
  createBooking: async (payload) => {
    const response = await api.post("/api/booking", payload)
    return response.data
  },

  getUserBookings: async (userId) => {
    const response = await api.get(`/api/booking?userId=${userId}`)
    return response.data
  },

  getAllBookings: async () => {
    const response = await api.get("/api/booking")
    return response.data
  },

  updateBookingStatus: async (bookingId, status) => {
    const response = await api.put(`/api/booking/${bookingId}`, { status })
    return response.data
  },

  cancelBooking: async (bookingId) => {
    const response = await api.delete(`/api/booking/${bookingId}`)
    return response.data
  },

  getBookingStats: async () => {
    const response = await api.get("/api/booking/stats")
    return response.data
  },
}
