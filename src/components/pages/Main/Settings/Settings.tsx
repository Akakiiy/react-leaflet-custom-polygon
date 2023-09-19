//@ts-ignore
import s from './Settings.module.scss'
import cn from 'classnames'
import React from 'react'
import {useAppDispatch} from "../../../../redux/store";
import {Select} from "antd";
import {useSelector} from "react-redux";
import {
    getDrawingPolygonColor,
    getDrawingPolygonOpacity,
    getPolylineColor, getPolylineDashOffset
} from "../../../../redux/selectors/settingSelectors";
import {
    setDrawingPolygonColor,
    setDrawingPolygonOpacity, setPolylineColor,
    setPolylineDashOffset
} from "../../../../redux/slices/settingSlice";

const Settings = () => {
    const dispatch = useAppDispatch()

    const drawingPolygonOpacity = useSelector(getDrawingPolygonOpacity)
    const drawingPolygonColor = useSelector(getDrawingPolygonColor)
    const polylineColor = useSelector(getPolylineColor)
    const polylineDashOffset = useSelector(getPolylineDashOffset)

    return (
        <div className={cn(s.root, s.noScrollBar)}>
            <div className={cn(s.header)}>
                <div className={s.headerCount}>
                    <div>
                        Настройки отрисовки полигонов
                    </div>
                </div>
            </div>
            <span className={s.selectTitle}>Прозрачность полигона</span>
            <Select
                className={s.select}
                defaultValue={drawingPolygonOpacity}
                style={{ width: 120 }}
                onChange={(value) => dispatch(setDrawingPolygonOpacity(value))}
                options={[
                    { value: '0.3', label: '0.3' },
                    { value: '0.6', label: '0.6' },
                    { value: '0.9', label: '0.9' },
                ]}
            />
            <span className={s.selectTitle}>Цвет полигона при отрисовке</span>
            <Select
                className={s.select}
                defaultValue={drawingPolygonColor}
                style={{ width: 120 }}
                onChange={(value) => dispatch(setDrawingPolygonColor(value))}
                options={[
                    { value: '#FBF0B2', label: '#FBF0B2' },
                    { value: '#97FFF4', label: '#97FFF4' },
                    { value: '#FFC436', label: '#FFC436' },
                    { value: '#974EC3', label: '#974EC3' },
                    { value: '#C70039', label: '#C70039' },
                ]}
            />
            <span className={s.selectTitle}>Цвет мнимых линий</span>
            <Select
                className={s.select}
                defaultValue={polylineColor}
                style={{ width: 120 }}
                onChange={(value) => dispatch(setPolylineColor(value))}
                options={[
                    { value: 'red', label: 'red' },
                    { value: '#97FFF4', label: '#97FFF4' },
                    { value: '#FFC436', label: '#FFC436' },
                    { value: '#974EC3', label: '#974EC3' },
                    { value: '#C70039', label: '#C70039' },
                ]}
            />
            <span className={s.selectTitle}>Отступ отрезков мнимых линий</span>
            <Select
                className={s.select}
                defaultValue={polylineDashOffset}
                style={{ width: 120 }}
                onChange={(value) => dispatch(setPolylineDashOffset(value))}
                options={[
                    { value: '2', label: '2' },
                    { value: '5', label: '5' },
                    { value: '7', label: '7' },
                    { value: '10', label: '10' },
                ]}
            />
        </div>
    )
}

export default Settings
