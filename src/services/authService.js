import api from "./api"

export const authService = {
  login: async (payload) => {
    const response = await api.post("/auth/login", payload)
    return response.data
  },

  register: async (payload) => {
    const response = await api.post("/auth/register", payload)
    return response.data
  },

  forgotPassword: async (email) => {
    const response = await api.post("/auth/forgot-password", { email })
    return response.data
  },

  resetPassword: async (token, newPassword) => {
    const response = await api.post("/auth/reset-password", { token, newPassword })
    return response.data
  },

  updateProfile: async (userId, data) => {
    const response = await api.put(`/customer/${userId}`, data)
    return response.data
  },
}
