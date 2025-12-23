import api from "./api"

interface LoginPayload {
  username: string
  password: string
}

interface RegisterPayload {
  fullName: string
  email: string
  phone: string
  password: string
}

interface UpdateProfilePayload {
  fullName?: string
  email?: string
  phone?: string
}

export const authService = {
  login: async (payload: LoginPayload) => {
    const response = await api.post("/auth/login", payload)
    return response.data
  },

  register: async (payload: RegisterPayload) => {
    const response = await api.post("/auth/register", payload)
    return response.data
  },

  forgotPassword: async (email: string) => {
    const response = await api.post("/auth/forgot-password", { email })
    return response.data
  },

  resetPassword: async (token: string, newPassword: string) => {
    const response = await api.post("/auth/reset-password", { token, newPassword })
    return response.data
  },

  updateProfile: async (userId: string, data: UpdateProfilePayload) => {
    const response = await api.put(`/customer/${userId}`, data)
    return response.data
  },
}