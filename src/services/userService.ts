import api from "./api"
import { ApiResponse } from "./commonType";

/* =======================
   Types
======================= */

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


export interface GetUsersParams {
  category?: string
  limit?: number
}


/* =======================
   Service
======================= */

export const userService = {
  getAllUsers: async (): Promise<ApiResponse<User[]>> => {
    const response = await api.get<ApiResponse<User[]>>("/api/users", null)
    return response.data
  },

  getUserById: async (
    userId: string
  ): Promise<ApiResponse<User>> => {
    const response = await api.get<ApiResponse<User>>(
      `/api/user/${userId}`
    )
    return response.data
  },

  createUser: async (
    payload: Partial<User>
  ): Promise<ApiResponse<UserResponse>> => {
    const response = await api.post<ApiResponse<User>>(
      "/user",
      payload
    )
    return response.data;
  },

  updateUser: async (
    userId: string,
    payload: Partial<User>
  ): Promise<ApiResponse<User>> => {
    const response = await api.put<ApiResponse<User>>(
      `/api/user/${userId}`,
      payload
    )
    return response.data
  },

  deleteUser: async (
    userId: string
  ): Promise<ApiResponse<void>> => {
    const response = await api.delete<ApiResponse<void>>(
      `/api/user/${userId}`
    )
    return response.data
  },
}
