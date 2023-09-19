import { createSlice } from '@reduxjs/toolkit'

type SidebarInitialState = {
  sidebarOpenWindow: SidebarOpenWindow | undefined
}

const sidebarInitialState: SidebarInitialState = {
  sidebarOpenWindow: 'PolygonList'
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: sidebarInitialState,
  reducers: {
    setOpenSidebarWindow: (state: SidebarInitialState, action: { type: any, payload: SidebarOpenWindow }) => {
      if (state.sidebarOpenWindow === action.payload) {
        state.sidebarOpenWindow = undefined
      } else {
        state.sidebarOpenWindow = action.payload
      }
    }
  }
})

const {
  reducer,
  actions
} = sidebarSlice

export const {
  setOpenSidebarWindow
} = actions

export default reducer

export type SidebarOpenWindow = 'PolygonList' | 'Settings' | undefined
