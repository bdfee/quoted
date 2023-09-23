import React from 'react'
import useWindowDimensions from '../../../layoutUtils/useWindowDimensions'

const SubMenuItemWrapper = ({ children, collapsed, position }) => {
  const { width: windowWidth } = useWindowDimensions()
  return (
    <div
      style={{
        display: collapsed ? 'none' : 'block',
        position: 'absolute',
        right: windowWidth > 774 ? '10vw' : '20vw',
        top: `${position * 10 + 1}vh`,
        backgroundColor: 'white',
      }}
    >
      {children}
    </div>
  )
}

export default SubMenuItemWrapper
