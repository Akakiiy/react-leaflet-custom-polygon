//@ts-ignore
import s from './MainLayout.module.scss'
import React from 'react'

const MainLayout: React.FC = ({ children }) => {
  return (
    <div className={s.mainLayout}>
      {children}
    </div>
  )
}

export default MainLayout
