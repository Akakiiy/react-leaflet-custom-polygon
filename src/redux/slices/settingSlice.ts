import { createSlice } from '@reduxjs/toolkit'

type SettingsInitialState = {
    drawingPolygonOpacity: number
    drawingPolygonColor: string
    polylineColor: string
    polylineDashOffset: string
}

const settingsInitialState: SettingsInitialState = {
    drawingPolygonOpacity: 0.3,
    drawingPolygonColor: '#19a2d3',
    polylineColor: 'red',
    polylineDashOffset: '5'
}

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: settingsInitialState,
    reducers: {
        setDrawingPolygonOpacity: (state: SettingsInitialState, action) => {
            state.drawingPolygonOpacity = action.payload
        },
        setDrawingPolygonColor: (state: SettingsInitialState, action) => {
            state.drawingPolygonColor = action.payload
        },
        setPolylineColor: (state: SettingsInitialState, action) => {
            state.polylineColor = action.payload
        },
        setPolylineDashOffset: (state: SettingsInitialState, action) => {
            state.polylineDashOffset = action.payload
        },
    }
})

const {
    reducer,
    actions
} = sidebarSlice

export const {
    setDrawingPolygonOpacity,
    setDrawingPolygonColor,
    setPolylineColor,
    setPolylineDashOffset
} = actions

export default reducer
