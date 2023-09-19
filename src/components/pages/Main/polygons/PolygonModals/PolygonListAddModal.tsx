import './PolygonListAddModal.scss'
import {
  Input,
  Modal,
  Select
} from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  getNewPolygonCoordsSelector,
  getShowAddNewPolygonModalSelector
} from '../../../../../redux/selectors/mapSelectors'
import {addPolygon, Polygon, setShowAddNewPolygonModal} from '../../../../../redux/slices/mapSlice'
import { useAppDispatch } from '../../../../../redux/store'
import {getRandomColor} from "../../../../../utils/getRandomColor/getRandomColor";

const PolygonListAddModal = () => {
  const dispatch = useAppDispatch()

  const showAddNewPolygonModal = useSelector(getShowAddNewPolygonModalSelector)
  const newPolygonCoords = useSelector(getNewPolygonCoordsSelector)

  const [polygonName, setPolygonName] = useState('')
  const { Option } = Select

  const handleCancel = () => {
    dispatch(setShowAddNewPolygonModal(false))
    setPolygonName('')
  }

  async function handleOk() {
    if (!newPolygonCoords) return
    dispatch(addPolygon({
      id: Math.floor(Math.random() * (1000000 - 1 + 1)) + 1,
      color: getRandomColor(),
      name: polygonName,
      coords: newPolygonCoords,
    } as Polygon))
    setPolygonName('')
  }

  return (
    <Modal
      className="polygonListAddModal"
      title="Добавить поле"
      open={showAddNewPolygonModal}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Input
        placeholder="Введите название"
        value={polygonName}
        onChange={(e) => setPolygonName(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
    </Modal>
  )
}

export default PolygonListAddModal
