import {createSlice} from '@reduxjs/toolkit'
import polygonsJson from './polygons.json'

type MapInitialState = {
    polygonsList: Polygon[],
    polygonFlyTo: number | undefined,
    drawingPolygonMode: boolean,
    showAddNewPolygonModal: boolean,
    newPolygonCoords: [number, number][][],
    editedPolygon: Polygon | undefined,
    selectedPolygonId: number | undefined,
    addInternalPolygonMode: boolean
}

const mapInitialState: MapInitialState = {
    polygonsList: polygonsJson.polygons as Polygon[],
    polygonFlyTo: undefined,
    drawingPolygonMode: false,
    showAddNewPolygonModal: false,
    newPolygonCoords: [],
    editedPolygon: undefined,
    selectedPolygonId: undefined,
    addInternalPolygonMode: false
}

const mapSlice = createSlice({
    name: 'map',
    initialState: mapInitialState,
    reducers: {
        addPolygon: (state: MapInitialState, action) => {
            state.polygonsList.push(action.payload)
            state.drawingPolygonMode = false
            state.showAddNewPolygonModal = false
        },
        editePolygon: (state: MapInitialState, action) => {
            state.editedPolygon = undefined
            state.polygonsList = state.polygonsList.map(polygon => {
                if (polygon.id === action.payload.id) {
                    return {...polygon, coords: action.payload.coords}
                }
                return polygon
            })
            state.drawingPolygonMode = false
            console.log('state.polygonsList', JSON.stringify(state.polygonsList))
        },
        deletePolygon: (state: MapInitialState, action) => {
            state.polygonsList = state.polygonsList.filter(polygon => polygon.id !== action.payload)
        },
        setDrawingPolygonMode: (state: MapInitialState, action) => {
            if (action.payload === false && state.editedPolygon) {
                state.polygonsList = state.polygonsList.map(polygon => (polygon.id === state.editedPolygon?.id) ? state.editedPolygon : polygon)
                state.editedPolygon = undefined
                state.addInternalPolygonMode = false
            }
            state.drawingPolygonMode = action.payload
        },
        setShowAddNewPolygonModal: (state: MapInitialState, action) => {
            state.showAddNewPolygonModal = action.payload
        },
        setEditedPolygon: (state: MapInitialState, action) => {
            if (state.editedPolygon) {
                // state.polygonsList = [...state.polygonsList, state.editedPolygon]
                state.polygonsList = state.polygonsList.map(polygon => (polygon.id === state.editedPolygon?.id) ? state.editedPolygon : polygon)
            }
            state.drawingPolygonMode = true
            state.editedPolygon = state.polygonsList.find(polygon => polygon.id === action.payload)
        },
        setNewPolygonCoords: (state: MapInitialState, action) => {
            state.newPolygonCoords = action.payload
        },
        setAddInternalPolygonMode: (state: MapInitialState, action) => {
            state.addInternalPolygonMode = action.payload
        },
        setSelectedPolygon: (state: MapInitialState, action) => {
            state.selectedPolygonId = action.payload
        },
        removeSelectedPolygon: (state) => {
            state.selectedPolygonId = undefined
        },
    }
})

const {
    reducer,
    actions
} = mapSlice

export const {
    setDrawingPolygonMode,
    setShowAddNewPolygonModal,
    setEditedPolygon,
    setNewPolygonCoords,
    setAddInternalPolygonMode,
    addPolygon,
    editePolygon,
    setSelectedPolygon,
    removeSelectedPolygon,
    deletePolygon
} = actions

export default reducer

export type Polygon = {
    id: number | string,
    coords: [number, number][][],
    name: string,
    color: string
};
