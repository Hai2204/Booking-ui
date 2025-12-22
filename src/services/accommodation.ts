import api from "./api"
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
      getAllAccommodations: async (): Promise<ApiResponse<Accommodation[]>> => {
        const response = await api.get<ApiResponse<Accommodation[]>>("/api/accommodations", null)
        return response.data
      },
}