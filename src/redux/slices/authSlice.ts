import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { authService } from "../../services/authService"
import { setAuthToken, removeAuthToken } from "../../services/tokenService"

interface User {
  id: number
  fullName: string
  email: string
  phone: string
  role: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
}

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

export const login = createAsyncThunk("auth/login", async (payload: LoginPayload, { rejectWithValue }) => {
  try {
    const response = await authService.login(payload);
    if (response && response.success && response.data) {
      setAuthToken(response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      return response.data.user
    }

    if (response && response.user && response.token) {
      setAuthToken(response.token)
      localStorage.setItem("user", JSON.stringify(response.user))
      return response.user
    }

    // fallback: surface backend message if present
    return rejectWithValue(response?.message || "Hệ thống không khả dụng")
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Hệ thống không khả dụng")
  }
})

export const register = createAsyncThunk("auth/register", async (payload: RegisterPayload, { rejectWithValue }) => {
  try {
    const response = await authService.register(payload)
    // Support both response shapes for register as well
    if (response && response.success && response.data) {
      setAuthToken(response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      return response.data.user
    }

    if (response && response.user && response.token) {
      setAuthToken(response.token)
      localStorage.setItem("user", JSON.stringify(response.user))
      return response.user
    }

    return rejectWithValue(response?.message || "Registration failed")
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Registration failed")
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      removeAuthToken()
    },
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.isLoading = false
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { logout, setUser, setLoading, clearError } = authSlice.actions
export default authSlice.reducer