//@ts-ignore
import s from './PolygonPreview.module.scss'
import cn from 'classnames'
import React from 'react'
import {Dropdown} from 'antd'
import PolygonCanvas from '../PolygonCanvas/PolygonCanvas'
import {useSelector} from 'react-redux'
import {getSelectedPolygonIdSelector} from '../../../../../redux/selectors/mapSelectors'
import {useAppDispatch} from '../../../../../redux/store'
import DeleteOption from '../../../../common/DeleteOption/DeleteOption'
import {Polygon, setEditedPolygon} from "../../../../../redux/slices/mapSlice"
import {EditOutlined} from '@ant-design/icons'

const PolygonPreview: React.FC<{ polygon: Polygon, onDelete: () => void }> = ({
                                                                                  polygon,
                                                                                  onDelete
                                                                              }) => {

    const selectedPolygonId = useSelector(getSelectedPolygonIdSelector)

    const dispatch = useAppDispatch()

    return (
        <div className={cn(s.root)}>
            <div
                className={cn(s.content, {[s.contentActive]: polygon.id === selectedPolygonId})}
            >
                <div className={cn(s.canvasRef)}>
                    <PolygonCanvas polygon={polygon}/>
                    <div className={cn(s.row)}>
                        <div className={cn(s.nameDiv)}>
                            <p className={cn(s.title)}>
                                {polygon.name}
                            </p>
                        </div>
                    </div>
                </div>
                <div className={cn(s.geoDiv)}>
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: '1',
                                    label: 'Редактировать полигон',
                                    onClick: () => dispatch(setEditedPolygon(+polygon.id))
                                }
                            ]
                        }}
                    >
                        <EditOutlined/>
                    </Dropdown>
                    <DeleteOption
                        onDelete={onDelete}
                        className={cn(s.trash)}
                        title={'Удалить полигон'}
                        popConfirmTitle={'Вы хотите удалить полигон?'}
                        popConfirmDescription={'Удалить полигон'}
                    />
                </div>
            </div>
        </div>
    )
}

export default PolygonPreview
