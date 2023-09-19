import { combineReducers, configureStore } from '@reduxjs/toolkit'
import mapReducer from './slices/mapSlice'
import sidebarReducer from './slices/sidebarSlice'
import settingReducer from "./slices/settingSlice";
import { useDispatch } from 'react-redux'

const rootReducer = combineReducers({
  mapReducer,
  sidebarReducer,
  settingReducer
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
