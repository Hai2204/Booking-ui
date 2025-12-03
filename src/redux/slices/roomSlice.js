import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { roomService } from "../../services/roomService"

const initialState = {
  rooms: [],
  selectedRoom: null,
  isLoading: false,
  error: null,
}

export const fetchRooms = createAsyncThunk("room/fetchRooms", async (_, { rejectWithValue }) => {
  try {
    const response = await roomService.getAllRooms()
    if (response.success) {
      return response.data
    }
    return rejectWithValue(response.message)
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const createRoom = createAsyncThunk("room/createRoom", async (payload, { rejectWithValue }) => {
  try {
    const response = await roomService.createRoom(payload)
    if (response.success) {
      return response.data
    }
    return rejectWithValue(response.message)
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const updateRoom = createAsyncThunk("room/updateRoom", async ({ roomId, payload }, { rejectWithValue }) => {
  try {
    const response = await roomService.updateRoom(roomId, payload)
    if (response.success) {
      return response.data
    }
    return rejectWithValue(response.message)
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const deleteRoom = createAsyncThunk("room/deleteRoom", async (roomId, { rejectWithValue }) => {
  try {
    const response = await roomService.deleteRoom(roomId)
    if (response.success) {
      return roomId
    }
    return rejectWithValue(response.message)
  } catch (error) {
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
        state.error = action.payload
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
