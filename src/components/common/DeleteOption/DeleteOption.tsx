import './DeleteOption.scss'
import React, { CSSProperties } from 'react'
import { Popconfirm } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';

type Props = {
  style?: CSSProperties
  popConfirmTitle?: string,
  popConfirmDescription?: string,
  className?: string,
  onDelete: () => void
  title?: string
}

const DeleteOption: React.FC<Props> = ({
  onDelete,
  title,
  className,
  popConfirmTitle,
  popConfirmDescription,
  style
}) => {

  return (
    <Popconfirm
      className='deleteOption'
      title={popConfirmTitle}
      placement='right'
      description={popConfirmDescription}
      onConfirm={onDelete}
      okText='Да'
      cancelText='Нет'
    >
      <DeleteOutlined
          style={style}
          className={className}
          title={title}
      />
    </Popconfirm>
  )
}

export default DeleteOption
