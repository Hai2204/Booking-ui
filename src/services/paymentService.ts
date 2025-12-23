import api from "lib/api"

interface ProcessPaymentPayload {
  bookingId: number
  amount: number
  paymentMethod: string
  cardNumber?: string
  expiryDate?: string
  cvv?: string
}

export const paymentService = {
  processPayment: async (payload: ProcessPaymentPayload) => {
    const response = await api.post("/payment", payload)
    return response.data
  },

  getPaymentHistory: async (userId: number) => {
    const response = await api.get(`/payment?userId=${userId}`)
    return response.data
  },
}