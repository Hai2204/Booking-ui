import api from "./api"

export const roomService = {
  getAllRooms: async (payload) => {
    const response = await api.get("/api/rooms", {
      params: {
        category: payload?.category,
        limit: payload?.limit
      }
    })
    return response.data
  },

  getRoomById: async (roomId) => {
    const response = await api.get(`/api/room/${roomId}`)
    return response.data
  },

  createRoom: async (payload) => {
    const response = await api.post("/api/room", payload)
    return response.data
  },

  updateRoom: async (roomId, payload) => {
    const response = await api.put(`/api/room/${roomId}`, payload)
    return response.data
  },

  deleteRoom: async (roomId) => {
    const response = await api.delete(`/api/room/${roomId}`)
    return response.data
  },
}
