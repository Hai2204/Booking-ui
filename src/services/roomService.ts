import api from "lib/api"

interface GetRoomsPayload {
  category?: string
  limit?: number
}

interface CreateRoomPayload {
  name: string
  typeRoom: number
  price: number
  description: string
  amenities: string
  policy: string
  roomCode: string
  roomCategory: string
  accommodationId: number
}

interface UpdateRoomPayload extends CreateRoomPayload {
  id: number
}

export const roomService = {
  getAllRooms: async (payload?: GetRoomsPayload) => {
    const response = await api.get("/api/rooms", {
      params: {
        category: payload?.category,
        limit: payload?.limit
      }
    })
    return response.data
  },

  getRoomById: async (roomId: number) => {
    const response = await api.get(`/api/room/${roomId}`)
    return response.data
  },

  createRoom: async (payload: CreateRoomPayload) => {
    const response = await api.post("/api/room", payload)
    return response.data
  },

  updateRoom: async (payload: UpdateRoomPayload) => {
    const response = await api.put(`/api/room`, payload)
    return response.data
  },

  deleteRoom: async (roomId: number) => {
    const response = await api.delete(`/api/room/${roomId}`)
    return response.data
  },
}