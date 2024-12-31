import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createGame } from '../api/plabApi'

//게임매치 등록 Thunk
export const createGameThunk = createAsyncThunk(
  'games/createGame',
  async (gameData, { rejectWithValue }) => {
    try {
    } catch (error) {}
  }
)
