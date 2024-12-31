import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createGame } from '../api/plabApi'

//게임매치 등록 Thunk
export const createGameThunk = createAsyncThunk(
  'games/createGame',
  async (gameData, { rejectWithValue }) => {
    try {
      const response = await createGame(gameData)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || '게시물 등록 실패'
      )
    }
  }
)

const gameSlice = createSlice({
  name: 'games',
  initialState: {
    games: [],
    game: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGameThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createGameThunk.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(createGameThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default gameSlice.reducer
