import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { roomService } from "../../services/roomService"

interface Room {
  id: number
  accommodation: any
  name: string
  typeRoom: number
  price: number
  active: number
  description: string
  amenities: string
  policy: string
  roomCode: string
  roomCategory: string
}

interface RoomState {
  rooms: Room[]
  selectedRoom: Room | null
  isLoading: boolean
  error: string | null
}

const initialState: RoomState = {
  rooms: [],
  selectedRoom: null,
  isLoading: false,
  error: null,
}

interface FetchRoomsPayload {
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

export const fetchRooms = createAsyncThunk("room/fetchRooms", async (payload: FetchRoomsPayload | undefined, { rejectWithValue }) => {
  try {
    const response = await roomService.getAllRooms(payload)
    if (response.success) {
      return response.data
    }
    return rejectWithValue(response.message)
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const createRoom = createAsyncThunk("room/createRoom", async (payload: CreateRoomPayload, { rejectWithValue }) => {
  try {
    const response = await roomService.createRoom(payload)
    if (response.success) {
      return response.data
    }
    return rejectWithValue(response.message)
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const updateRoom = createAsyncThunk("room/updateRoom", async (payload: UpdateRoomPayload, { rejectWithValue }) => {
  try {
    const response = await roomService.updateRoom(payload)
    if (response.success) {
      return response.data
    }
    return rejectWithValue(response?.response?.data?.message || "Update failed")
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || error.response || error.message)
  }
})

export const deleteRoom = createAsyncThunk("room/deleteRoom", async (roomId: number, { rejectWithValue }) => {
  try {
    const response = await roomService.deleteRoom(roomId)
    if (response.success) {
      return roomId
    }
    return rejectWithValue(response.message)
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setSelectedRoom: (state, action) => {
      state.selectedRoom = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.isLoading = false
        state.rooms = action.payload
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.rooms.push(action.payload)
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        const index = state.rooms.findIndex((r) => r.id === action.payload.id)
        if (index !== -1) {
          state.rooms[index] = action.payload
        }
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.rooms = state.rooms.filter((r) => r.id !== action.payload)
      })
  },
})

export const { setSelectedRoom, clearError } = roomSlice.actions
export default roomSlice.reducer