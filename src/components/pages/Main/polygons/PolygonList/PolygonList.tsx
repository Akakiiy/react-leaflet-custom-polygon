import './PolygonsListCSSTransition.scss'
//@ts-ignore
import s from './PolygonList.module.scss'
import cn from 'classnames'
import React from 'react'
import PolygonPreview from '../PolygonPreview/PolygonPreview'
import {useSelector} from 'react-redux'
import {getAllPolygonsSelector, getDrawingPolygonModeSelector} from '../../../../../redux/selectors/mapSelectors'
import {deletePolygon, setDrawingPolygonMode} from '../../../../../redux/slices/mapSlice'
import {useAppDispatch} from '../../../../../redux/store'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {Button} from "antd";

const PolygonList: React.FC<{
    onPolygonOption?: (id: string | number) => void
}> = () => {
    const dispatch = useAppDispatch()

    const polygons = useSelector(getAllPolygonsSelector)
    const sortedPolygons = [...polygons].sort((a, b) => a.name.localeCompare(b.name))
    const drawingPolygonMode = useSelector(getDrawingPolygonModeSelector)

    const toggleDrawing = () => dispatch(setDrawingPolygonMode(!drawingPolygonMode))

    const polygonsTotalCount = polygons.length

    /*
    * Склоняем слово полигоны
    * */
    const declination = (num: number, variant: string[]): string => {
        const cases = [2, 0, 1, 1, 1, 2]
        return num % 100 > 4 && num % 100 < 20
            ? variant[2]
            : variant[cases[num % 10 < 5 ? num % 10 : 5]]
    }

    const inclinedText = `Всего ${polygonsTotalCount} ${declination(polygonsTotalCount, [
        'полигон',
        'полигона',
        'полигонов'
    ])}`

    return (
        <div className={cn(s.root, s.noScrollBar)}>
            <div className={cn(s.header)}>
                <div className={s.headerCount}>
                    <div>
                        {`${inclinedText}`}
                    </div>
                </div>
            </div>
            <Button
                className={cn(s.addButton)}
                onClick={toggleDrawing}
            >
                {
                    drawingPolygonMode
                        ? (
                            <div>
                                Выключить режим редактирования
                            </div>
                        )
                        : (
                            <>
                                <span style={{marginRight: '0.5rem'}}>+</span>
                                Добавить поле
                            </>
                        )
                }
            </Button>
            <TransitionGroup className='polygons'>
                {sortedPolygons.map(polygon => {
                    if (!polygon.coords.length) return null
                    return (
                        <CSSTransition
                            key={polygon.id}
                            timeout={500}
                            classNames='item'
                        >
                            <PolygonPreview
                                polygon={polygon}
                                onDelete={() => dispatch(deletePolygon(polygon.id))}
                                // key={polygon.id} не хватает времени на то, чтоб нормально перерисовывать канвас при редактировании полигона
                            />
                        </CSSTransition>
                    )
                })}
            </TransitionGroup>
        </div>
    )
}

export default PolygonList
