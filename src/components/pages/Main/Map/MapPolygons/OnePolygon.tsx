import {Polygon, Popup, useMap} from 'react-leaflet'
import React, {useEffect, useRef} from 'react'
import type {Polygon as PolygonType} from '../../../../../redux/slices/mapSlice'
import {useAppDispatch} from "../../../../../redux/store";
import {removeSelectedPolygon, setSelectedPolygon} from "../../../../../redux/slices/mapSlice";

type Props = {
  polygon: PolygonType
}

const OnePolygon: React.FC<Props> = ({ polygon }) => {

  const dispatch = useAppDispatch()
  const map = useMap()

  const polygonRef = useRef<any>(null)
  useEffect(() => {
    map.on('popupopen', (e) => {
      // Приведение типов для доступа к _source
      const source = (e.popup as any)._source
      if (source === polygonRef.current) {
        dispatch(setSelectedPolygon(polygon.id))
      }
    })
    map.on('popupclose', (e) => {
      const source = (e.popup as any)._source
      if (source === polygonRef.current) {
        dispatch(removeSelectedPolygon())
      }
    })

    return () => {
      map.off('popupopen')
      map.off('popupclose')
    }
  }, [])

  return (
    <Polygon
      ref={polygonRef}
      key={polygon.id}
      positions={polygon.coords}
      pathOptions={{ fillColor: polygon.color, ...polygonDefaultStyleSettings }}
    >
      <Popup>
        <div>
          {polygon.name}
        </div>
      </Popup>
    </Polygon>
  )
}

const polygonDefaultStyleSettings = {
  fillOpacity: .63,
  color: '#fff',
  opacity: .6,
  weight: 1
}

export default OnePolygon
