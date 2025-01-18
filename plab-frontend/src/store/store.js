import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import pageReducer from '../features/pageSlice'
import gymReducer from '../features/gymSlice'
import gameReducer from '../features/gameSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    page: pageReducer,
    gyms: gymReducer,
    games: gameReducer,
  },
})

export default store
