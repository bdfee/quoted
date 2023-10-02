import React from 'react'
import useWindowDimensions from '../../../layoutUtils/useWindowDimensions'
import styles from './Menu.module.css'

const SubMenuItemWrapper = ({ children, collapsed, position }) => {
  const { width: windowWidth } = useWindowDimensions()

  const responsiveStyle = {
    display: collapsed ? 'none' : 'block',
    right: windowWidth > 774 ? '15vw' : '25vw',
    top: `${position * 10 + 1}vh`,
  }

  return (
    <div className={styles['sub-menu-item-wrapper']} style={responsiveStyle}>
      {children}
    </div>
  )
}

export default SubMenuItemWrapper
