//@ts-ignore
import s from './PolygonSpotMenu/PolygonSpotMenu.module.scss'
import React, {
  useCallback,
  useEffect,
  useState
} from 'react'
import {
  Marker,
  Polygon,
  Polyline,
  useMap
} from 'react-leaflet'
import PolygonSpotMenu from './PolygonSpotMenu/PolygonSpotMenu'
import L from 'leaflet'
import { useSelector } from 'react-redux'
import {
  getAddInternalPolygonModeSelector,
  getDrawingPolygonModeSelector,
  getEditedPolygonSelector
} from '../../../../../redux/selectors/mapSelectors'
import {
  getDrawingPolygonColor,
  getDrawingPolygonOpacity,
  getPolylineColor, getPolylineDashOffset
} from "../../../../../redux/selectors/settingSelectors";

export type AddPolygonCoords = [number, number][]
export type EditPolygonCoords = [number, number][][]
type Props = {};

const DrawingPolygon: React.FC<Props> = () => {
  const drawingPolygonMode = useSelector(getDrawingPolygonModeSelector)
  const editedPolygon = useSelector(getEditedPolygonSelector)
  const addInternalPolygonMode = useSelector(getAddInternalPolygonModeSelector)

  const drawingPolygonOpacity = useSelector(getDrawingPolygonOpacity)
  const drawingPolygonColor = useSelector(getDrawingPolygonColor)
  const polylineColor = useSelector(getPolylineColor)
  const polylineDashOffset = useSelector(getPolylineDashOffset)

  const [polygonCoords, setPolygonCoords] = useState<AddPolygonCoords | EditPolygonCoords>([])
  const [futureStart, setFutureStart] = useState<null | AddPolygonCoords>(null)
  const [futureEnd, setFutureEnd] = useState<null | AddPolygonCoords>(null)

  const map = useMap()
  /*
  * проверка на режим редактирования у полигона
  * */
  useEffect(() => {
    if (editedPolygon) {
      setPolygonCoords(editedPolygon.coords)
    } else {
      setPolygonCoords([])
    }
  }, [editedPolygon])

  /*
  * добавление дополнительного массива, для внутреннего контура
  * */
  useEffect(() => {
    if (addInternalPolygonMode) {
      setPolygonCoords(polygonCoords => [...polygonCoords, []] as EditPolygonCoords)
    }
  }, [addInternalPolygonMode])

  /*
  * добавление новой точки полигона по клику
  * */
  const handleMapClick = useCallback((e: any) => {
    const {
      latlng,
      originalEvent
    } = e
    const {
      lat,
      lng
    } = latlng
    // Получаем элемент, на который был произведен клик
    const clickedElement = originalEvent.target
    // Проверяем, находится ли кликнутый элемент внутри PolygonSpotMenu
    const isClickInsidePolygonSpotMenu = clickedElement.closest('.polygon-spot-menu') !== null
    // Если клик произошел внутри PolygonSpotMenu, то игнорируем его
    if (isClickInsidePolygonSpotMenu) {
      return
    }

    // добавляем координату для мнимых линий
    if (futureStart === null && !addInternalPolygonMode) {
      setFutureStart([lat, lng])
    }

    if (editedPolygon) {
      setPolygonCoords((prevCoords) => {
        if (addInternalPolygonMode) {
          //добавление точек у внутреннего контура
          return prevCoords.map((arr, i) => {
            if (i === prevCoords.length - 1) {
              return [...arr, [lat, lng]]
            }
            return arr
          }) as EditPolygonCoords
        }
        // добавление точек у редактируемого полигона
        return prevCoords.map((arr, i) => {
          if (i === 0) {
            return [...arr, [lat, lng]]
          }
          return arr
        }) as EditPolygonCoords

      })
    } else {
      //добавление точек у полигона
      setPolygonCoords((prevCoords) => [...prevCoords, [lat, lng]] as AddPolygonCoords)
    }
  }, [addInternalPolygonMode, editedPolygon, futureStart, polygonCoords])

  /*
  * определение положения курсора для вспомогательных линий
  * */
  const handleMapMouseMove = useCallback((e: any) => {
    const { latlng } = e
    const {
      lat,
      lng
    } = latlng
    setFutureEnd([lat, lng])
  }, [futureStart])

  /*
  * Навешиваем обработчки событий
  * click - добавление новой точки полигона
  * mousemove - отрисовка вспомогательных линий
  * */
  useEffect(() => {
    if (drawingPolygonMode || editedPolygon) {
      map.on('click', handleMapClick)
      map.on('mousemove', handleMapMouseMove)
    } else {
      setPolygonCoords([])
      setFutureStart(null)
      setFutureEnd(null)
      map.off('click', handleMapClick)
      map.off('mousemove', handleMapMouseMove)
    }
    return () => {
      map.off('click', handleMapClick)
      map.off('mousemove', handleMapMouseMove)
    }
  }, [drawingPolygonMode, map, futureStart, editedPolygon, addInternalPolygonMode])

  /**
   * приводим координаты к общему виду todo (костыльно?)
   **/
  const currentCoords = editedPolygon ? polygonCoords as EditPolygonCoords : [polygonCoords] as EditPolygonCoords

  /*
  * Редактирование полигона
  * */
  const editEventHandlers = (id: number, arrIndex: number) => ({
    //HACK: dragend используется библиотекой! не удалять! это особенность библиотеки
    dragend(e: any) {
      const newCoords: EditPolygonCoords = currentCoords.map((arr, arrEditedIndex) => {
        if (arrEditedIndex === arrIndex) {
          return arr.map((coords, index) => {
            if (index === id) {
              const {
                lat,
                lng
              } = e.target.getLatLng()
              return [lat, lng]
            }
            return coords
          })
        }
        return arr
      })

      if (editedPolygon) {
        setPolygonCoords(newCoords)
      } else {
        setPolygonCoords(newCoords[0])
      }
    }
  })

  /*
  * удаление точки
  * */
  const deletePolygonSpot = (id: number, arrIndex: number) => {
    const newCoords: EditPolygonCoords = currentCoords.map((arr, arrEditedIndex) => {
      if (arrEditedIndex === arrIndex) {
        return arr.filter((coord, index) => id !== index)
      }
      return arr
    })

    if (editedPolygon) {
      setPolygonCoords(newCoords)
    } else {
      setPolygonCoords(newCoords[0])
    }
  }

  return (
    <>
      {
        drawingPolygonMode
          ? <Polygon
            positions={polygonCoords}
            pathOptions={{
              stroke: true,
              weight: 2,
              fillOpacity: drawingPolygonOpacity,
              color: drawingPolygonColor,

          }}
          >
            {
              drawingPolygonMode
                ? currentCoords.map((arr, arrIndex) => {
                  return arr.map((coord, index) => {
                    return (
                      <Marker
                        icon={customIcon}
                        eventHandlers={editEventHandlers(index, arrIndex)}
                        key={index}
                        draggable={true}
                        autoPan={true}
                        position={coord}
                      >
                        <PolygonSpotMenu
                          key={index}
                          polygonCoords={currentCoords}
                          deletePolygonSpot={() => deletePolygonSpot(index, arrIndex)}
                          editedPolygon={editedPolygon}
                        />
                      </Marker>
                    )
                  })
                })
                : null
            }
          </Polygon>
          : null
      }
      {polygonCoords.length > 0 && !editedPolygon && drawingPolygonMode
        ? <>
          <Polyline
            positions={[polygonCoords[0], futureEnd] as AddPolygonCoords}
            color="red"
            pathOptions={{weight: 2, dashArray: '5, 10', color: polylineColor, dashOffset: polylineDashOffset}}
            interactive={false}
          />
          <Polyline
            positions={[polygonCoords[polygonCoords.length - 1], futureEnd] as AddPolygonCoords}
            pathOptions={{weight: 2, dashArray: '5, 10', color: polylineColor, dashOffset: polylineDashOffset}}
            color="red"
            interactive={false}
          />
        </>
        : null}
    </>
  )
}

/*
* Создаем кастомную иконку маркера
* */
const customIcon = L.divIcon({
  className: s.polygonSpotMenu, // CSS класс для стилизации иконки
  html: '<div class="' + s.iconContent + '"></div>',
  iconSize: [12, 12] // размер иконки в пикселях
})

export default DrawingPolygon
