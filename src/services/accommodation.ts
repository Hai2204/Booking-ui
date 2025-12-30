import api from "lib/api"
import { ApiResponse } from "./commonType";

export interface Accommodation {
  accommodationId: number;
  partner: Partner;
  name: string;
  accommodationType: string;
  description: string;
  city: string;
  address: string;
}
export interface Partner {
  partnerId: number;
  name: string;
  contactInfo: string;
}

export const accommodationService = {
  getAllAccommodations: async (id?: number): Promise<ApiResponse<Accommodation[]>> => {
    const response = await api.get<ApiResponse<Accommodation[]>>("/api/accommodations", {
      params: {
        id: id
      }
    })
    return response.data
  },
  createAccommodation: async (payload: Accommodation): Promise<ApiResponse<Accommodation>> => {
    const response = await api.post<ApiResponse<Accommodation>>("/api/accommodation", payload)
    return response.data
  },
}
