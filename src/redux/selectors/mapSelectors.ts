import type { RootState } from '../store'
import { createSelector } from '@reduxjs/toolkit'

const getAllPolygons = (state: RootState) => {
  return state.mapReducer.polygonsList
}
export const getAllPolygonsSelector = createSelector(
  getAllPolygons,
  (polygons) => {
    return polygons
  }
)
const getPolygonFlyTo = (state: RootState) => {
  return state.mapReducer.polygonFlyTo
}
export const getPolygonFlyToSelector = createSelector(
  getPolygonFlyTo,
  (polygonFlyTo) => {
    return polygonFlyTo
  }
)
const getDrawingPolygonMode = (state: RootState) => {
  return state.mapReducer.drawingPolygonMode
}
export const getDrawingPolygonModeSelector = createSelector(
  getDrawingPolygonMode,
  (drawingPolygonMode) => {
    return drawingPolygonMode
  }
)
const getShowAddNewPolygonModal = (state: RootState) => {
  return state.mapReducer.showAddNewPolygonModal
}
export const getShowAddNewPolygonModalSelector = createSelector(
  getShowAddNewPolygonModal,
  (showAddNewPolygonModal) => {
    return showAddNewPolygonModal
  }
)
const getEditedPolygon = (state: RootState) => {
  return state.mapReducer.editedPolygon
}
export const getEditedPolygonSelector = createSelector(
  getEditedPolygon,
  (editedPolygon) => {
    return editedPolygon
  }
)
const getNewPolygonCoords = (state: RootState) => {
  return state.mapReducer.newPolygonCoords
}
export const getNewPolygonCoordsSelector = createSelector(
  getNewPolygonCoords,
  (newPolygonCoords) => {
    return newPolygonCoords
  }
)
const getSelectedPolygonId = (state: RootState) => {
  return state.mapReducer.selectedPolygonId
}
export const getSelectedPolygonIdSelector = createSelector(
  getSelectedPolygonId,
  (selectedPolygonId) => {
    return selectedPolygonId
  }
)
const getAddInternalPolygonMode = (state: RootState) => {
  return state.mapReducer.addInternalPolygonMode
}
export const getAddInternalPolygonModeSelector = createSelector(
  getAddInternalPolygonMode,
  (addInternalPolygonMode) => {
    return addInternalPolygonMode
  }
)
