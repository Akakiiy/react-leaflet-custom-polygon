import React from 'react'
import 'leaflet-editable'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import OnePolygon from './OnePolygon'
import { useSelector } from 'react-redux'
import {
  getAllPolygonsSelector,
  getEditedPolygonSelector
} from '../../../../../redux/selectors/mapSelectors'
import {Polygon} from "../../../../../redux/slices/mapSlice";

type Props = {}

const MapPolygons: React.FC<Props> = () => {
  const polygons = useSelector(getAllPolygonsSelector)
  const editedPolygon = useSelector(getEditedPolygonSelector)

  return (
    <>
      {polygons.map((polygon: Polygon, index: number) => {
        //фильтр для редактируемого полигона
        if (polygon.id === editedPolygon?.id) return null
        return (
          <OnePolygon
            polygon={polygon}
            key={index}
          />
        )
      })}
    </>
  )
}

export default React.memo(MapPolygons)
