import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { partnerService } from "@/services/partnerService"
import { RootState } from "@/redux/store"


export const fetchPartners = createAsyncThunk("partner/fetchPartners", async (id: number | undefined, { rejectWithValue }) => {
    try {
        const response = await partnerService.getAllPartner(id)
        if (response.success) {
            return response.data
        }
        return rejectWithValue(response.message)
    } catch (error: any) {
        return rejectWithValue(error.message)
    }
})


const initialState: PartnerState = {
    partners: [],
    isLoading: false,
    error: null,
}


const partnerSlice = createSlice({
    name: "partner",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPartners.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchPartners.fulfilled, (state, action) => {
                state.isLoading = false
                state.partners = action.payload
            })
            .addCase(fetchPartners.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
    },
})

export const { clearError } = partnerSlice.actions
export const partnerState = (state: RootState) => state.partner;

export default partnerSlice.reducer