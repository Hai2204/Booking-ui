import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { userService } from "@/services/userService"
import { UserCustomerModal } from "@/pages/Admin/UserManagement";
import { ApiResponse } from "@/services/commonType";
import { RootState } from "@/redux/store";

export interface User {
  username: string;
  fullName: string;
  email?: string | null;
  phone?: string | null;
  age?: number | null;
  nationalId?: string | null;
  roleName: string;
}
export interface UserResponse {
  id: number;
  username: string;
  fullName: string;
}


export interface UserState {
  users: User[]
  selectedUser: User | null
  isLoading: boolean
  error: string | null
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,
}


export const fetchUsers = createAsyncThunk<
  User[],            
  void,                    
  { rejectValue: string }
>(
  "user/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getAllUsers()
      if (response?.success) {
        return response.data as User[]
      }

      return rejectWithValue(response?.message || "Fetch users failed")
    } catch (error: any) {
      return rejectWithValue(error.message || "Unknown error")
    }
  }
)
export const createUser = createAsyncThunk<
  UserResponse,            
  UserCustomerModal,                    
  { rejectValue: string }
>(
  "user/createUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userService.createUser(payload) as ApiResponse<UserResponse>
      if (response?.success) {
        return response.data as UserResponse
      }
      return rejectWithValue(response.message || "Fetch users failed")
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || error.response || "Unknown error")
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.isLoading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ?? "Fetch users failed"
      })
  },
})

export const { setSelectedUser, clearError } = userSlice.actions
export const allUsers = (state: RootState) => state.user.users;
export const selectIsLoading = (state: RootState) => state.user.isLoading

export default userSlice.reducer
