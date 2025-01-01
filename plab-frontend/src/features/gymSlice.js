import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getGyms } from '../api/plabApi'

//전체 체육관 가져오기
export const fetchGymsThunk = createAsyncThunk(
  'gyms/fetchGyms',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getGyms()
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || '체육관 리스트 불러오기 실패'
      )
    }
  }
)

const gymSlice = createSlice({
  name: 'gyms',
  initialState: {
    gyms: [],
    gym: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGymsThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchGymsThunk.fulfilled, (state, action) => {
        state.loading = false
        state.gyms = action.payload.gyms
      })
      .addCase(fetchGymsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default gymSlice.reducer
