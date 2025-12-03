import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Room {
  id: string
  name: string
  description: string
  price: number
  capacity: number
  image: string
  amenities: string[]
  available: boolean
}

interface RoomState {
  rooms: Room[]
  selectedRoom: Room | null
  loading: boolean
  error: string | null
}

const initialState: RoomState = {
  rooms: [],
  selectedRoom: null,
  loading: false,
  error: null,
}

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload
    },
    addRoom: (state, action: PayloadAction<Room>) => {
      state.rooms.push(action.payload)
    },
    updateRoom: (state, action: PayloadAction<Room>) => {
      const index = state.rooms.findIndex((r) => r.id === action.payload.id)
      if (index !== -1) {
        state.rooms[index] = action.payload
      }
    },
    deleteRoom: (state, action: PayloadAction<string>) => {
      state.rooms = state.rooms.filter((r) => r.id !== action.payload)
    },
    setSelectedRoom: (state, action: PayloadAction<Room | null>) => {
      state.selectedRoom = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
})

export const { setRooms, addRoom, updateRoom, deleteRoom, setSelectedRoom, setLoading, setError } = roomSlice.actions
export default roomSlice.reducer
