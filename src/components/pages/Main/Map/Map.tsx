import 'leaflet/dist/leaflet.css' // важнейший импорт из самой карты, без него карта работает некорректно
import './leafletFix.css' // доп файл, убирает флаг (я против войны на украине, но живу пока что в рф) и ссылку на leaflet
import 'leaflet-draw/dist/leaflet.draw-src.css'
import React from 'react'
import MapViewSelect from './MapViewSelect/MapViewSelect'
import MapPolygons from './MapPolygons/MapPolygons'
import DrawingPolygon from './MapPolygons/DrawingPolygon'
import cn from 'classnames'
import { MapContainer, ZoomControl } from 'react-leaflet'
//@ts-ignore
import s from './Map.module.scss'

const Map = () => {

  return (
    <MapContainer
      className={cn(s.map)}
      center={[54.925946, 82.775931]}
      zoomControl={false}
      minZoom={3}
      zoom={10}
    >
      <MapViewSelect />
      <MapPolygons />
      <DrawingPolygon />
      <ZoomControl position='topright' />
    </MapContainer>
  )
}

export default React.memo(Map)
