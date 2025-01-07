import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  createGame,
  getCreatedGames,
  deleteGame,
  getGameById,
} from '../api/plabApi'

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

//매니저 본인이 만든 게임들 전체 가져오기 Thunk
export const getCreatedGamesThunk = createAsyncThunk(
  'games/getcreatedgames',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCreatedGames()
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          '매니저 본인이 만든 게임들 가져오기 실패'
      )
    }
  }
)

//특정 게임 가져오기
export const fetchGameByIdThunk = createAsyncThunk(
  'games/getgamebyid',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getGameById(id)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || '게시물 불러오기 실패'
      )
    }
  }
)

//게임 삭제 Thunk
export const deleteGameThunk = createAsyncThunk(
  'games/deletegame',
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteGame(id)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게임 삭제 실패')
    }
  }
)

const gameSlice = createSlice({
  name: 'games',
  initialState: {
    games: [],
    game: null,
    gamedate: null,
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
      .addCase(createGameThunk.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(createGameThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    builder
      .addCase(getCreatedGamesThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getCreatedGamesThunk.fulfilled, (state, action) => {
        state.loading = false
        state.games = action.payload.games
      })
      .addCase(getCreatedGamesThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    builder
      .addCase(deleteGameThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteGameThunk.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(deleteGameThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    builder
      .addCase(fetchGameByIdThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchGameByIdThunk.fulfilled, (state, action) => {
        state.loading = false
        state.game = action.payload.game
        state.gamedate = action.payload.jsgamedate
      })
      .addCase(fetchGameByIdThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default gameSlice.reducer
