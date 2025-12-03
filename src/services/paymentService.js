import api from "./api"

export const paymentService = {
  processPayment: async (payload) => {
    const response = await api.post("/payment", payload)
    return response.data
  },

  getPaymentHistory: async (userId) => {
    const response = await api.get(`/payment?userId=${userId}`)
    return response.data
  },
}
