import type { RootState } from '../store'
import { createSelector } from '@reduxjs/toolkit'

const getSidebarOpenWindow = (state: RootState) => {
  return state.sidebarReducer.sidebarOpenWindow
}
export const getSidebarOpenWindowSelector = createSelector(
  getSidebarOpenWindow,
  (sidebarOpenWindow) => {
    return sidebarOpenWindow
  }
)
