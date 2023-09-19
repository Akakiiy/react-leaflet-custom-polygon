import './SidebarContainerCSSTransition.scss'
import React from 'react'
import PolygonList from '../polygons/PolygonList/PolygonList'
import Sidebar from './Sidebar'
import {CSSTransition, SwitchTransition} from 'react-transition-group'
import {useSelector} from 'react-redux'
import {getSidebarOpenWindowSelector} from '../../../../redux/selectors/sidebarSelectors'
import Settings from "../Settings/Settings";

type Props = {}

const SidebarContainer: React.FC<Props> = () => {
    const sidebarOpenWindow = useSelector(getSidebarOpenWindowSelector)

    return (
        <>
            <Sidebar/>
            <SwitchTransition mode='out-in'>
                <CSSTransition
                    key={sidebarOpenWindow}
                    classNames='sidebar-fade'
                    timeout={280}
                >
                    {
                        sidebarOpenWindow === 'PolygonList'
                            ? <PolygonList/>
                            : sidebarOpenWindow === 'Settings'
                                ? <Settings/>
                                : <></>
                    }
                </CSSTransition>
            </SwitchTransition>
        </>
    )
}

export default React.memo(SidebarContainer)
