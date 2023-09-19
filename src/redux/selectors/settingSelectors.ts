import {RootState} from "../store";

export const getDrawingPolygonOpacity = (state: RootState) => {
    return state.settingReducer.drawingPolygonOpacity
}
export const getDrawingPolygonColor = (state: RootState) => {
    return state.settingReducer.drawingPolygonColor
}
export const getPolylineColor = (state: RootState) => {
    return state.settingReducer.polylineColor
}
export const getPolylineDashOffset = (state: RootState) => {
    return state.settingReducer.polylineDashOffset
}
