import api from "lib/api"
import { ApiResponse } from "./commonType"


export const partnerService = {
  getAllPartner: async (payload?: number | undefined) => {
    const response = await api.get("/api/partners", {
      params: {
        id: payload
      }
    })
    return response.data as ApiResponse<Partner[]>
  },
  createPartner: async (payload: Partner) => {
    const response = await api.post("/api/partner", payload)
    return response.data as ApiResponse<Partner>
  },
  updatePartner: async (payload: Partner) => {
    const response = await api.put("/api/partner", payload)
    return response.data as ApiResponse<Partner>
  },
}