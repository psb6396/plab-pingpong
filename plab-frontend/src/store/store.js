import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authslice'
import pageReducer from '../features/pageSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    page: pageReducer,
  },
})

export default store
