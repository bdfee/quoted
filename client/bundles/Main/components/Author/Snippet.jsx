import React from 'react'
import useWindowDimensions from '../../../layoutUtils/useWindowDimensions'

const Snippet = ({ name, snippet }) => {
  const { width: windowWidth } = useWindowDimensions()

  const headerStyle = () => {
    const fontSize =
      windowWidth < 600 ? '20px' : windowWidth < 1200 ? '25px' : '30px'

    return {
      fontSize,
      margin: '5px 0 10px',
    }
  }

  return (
    <div style={{}}>
      <h3 style={headerStyle()}>{' - ' + name}</h3>
      <div
        style={{
          width: '100%',
        }}
      >
        <p style={{ margin: '0 1vw', overflow: 'auto', maxHeight: '12vh' }}>
          {snippet}
        </p>
      </div>
    </div>
  )
}

export default Snippet
