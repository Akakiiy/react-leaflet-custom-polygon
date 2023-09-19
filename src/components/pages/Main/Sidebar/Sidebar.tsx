//@ts-ignore
import s from './Sidebar.module.scss'
import cn from 'classnames'
import React from 'react'
import styled from 'styled-components'
import {useAppDispatch} from '../../../../redux/store'
import type {SidebarOpenWindow} from '../../../../redux/slices/sidebarSlice'
import {setOpenSidebarWindow} from '../../../../redux/slices/sidebarSlice'
import {useSelector} from 'react-redux'
import {getSidebarOpenWindowSelector} from '../../../../redux/selectors/sidebarSelectors'
import {GlobalOutlined, SettingOutlined} from '@ant-design/icons';

const Sidebar: React.FC = () => {
    const dispatch = useAppDispatch()
    const sidebarOpenWindow = useSelector(getSidebarOpenWindowSelector)

    /*
    * Выбор бокового меню
    * */
    const handleChangeSidebarContent = (openSidebarContent: SidebarOpenWindow) => {
        dispatch(setOpenSidebarWindow(openSidebarContent))
    }

    return (
        <div className={cn(s.nav)}>
            <div className={cn(s.navWrapper)}>
                <div>
                    <StyledIcon
                        active={(sidebarOpenWindow === 'PolygonList')}
                        onClick={() => handleChangeSidebarContent('PolygonList')}
                    >
                        <GlobalOutlined />
                    </StyledIcon>
                    <StyledIcon
                        active={(sidebarOpenWindow === 'Settings')}
                        onClick={() => handleChangeSidebarContent('Settings')}
                    >
                        <SettingOutlined />
                    </StyledIcon>
                </div>
            </div>
        </div>
    )
}

export default Sidebar

const StyledIcon = styled('div')<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin: 2em 0;

  svg {
    width: 25px;
    height: 25px;
  }

  path {
    transition: fill 0.4s;
    fill: ${({ active }) => (!active ? '#fff' : '#FFBB5C')};
  }

  &:hover {
    path {
      fill: ${({ color }) => color || '#FFBB5C'};
    }
  }
`
