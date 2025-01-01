import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authslice'
import pageReducer from '../features/pageSlice'
import gymReducer from '../features/gymSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    page: pageReducer,
    gyms: gymReducer,
  },
})

export default store
