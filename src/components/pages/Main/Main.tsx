import './styles.scss'
import React from 'react'
import MainLayout from './MainLayout/MainLayout'
import SidebarContainer from './Sidebar/SidebarContainer'
import Map from './Map/Map'
import PolygonListAddModal from './polygons/PolygonModals/PolygonListAddModal'

const MainPage = () => {

    return (
        <div style={{
            position: 'relative',
            height: '100vh'
        }}
        >
            <MainLayout>
                <SidebarContainer/>
                <Map/>
                <PolygonListAddModal/>
            </MainLayout>
        </div>
    )
}

export default MainPage
