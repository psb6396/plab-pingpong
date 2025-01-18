import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { applyGame } from '../api/reservationApi'

//특정 게임 가져오기
export const applyGameThunk = createAsyncThunk(
  'reservations/applygame',
  async (id, { rejectWithValue }) => {
    try {
      const response = await applyGame(id)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || '게시물 불러오기 실패'
      )
    }
  }
)

const reservationSlice = createSlice({
  name: 'reservations',
  initialState: {
    reservations: [],
    reservation: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(applyGameThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(applyGameThunk.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(applyGameThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default reservationSlice.reducer
