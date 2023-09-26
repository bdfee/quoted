import React from 'react'
import useWindowDimensions from '../../layoutUtils/useWindowDimensions'

const Quote = ({ quote, handleClick, index, revealStyle }) => {
  const { width: windowWidth } = useWindowDimensions()

  return (
    <div
      style={{
        ...revealStyle,
        height: 'auto',
        width: 'fit-content',
        borderRadius: '20px',
        border: '1px solid black',
      }}
      onClick={() => handleClick(index)}
    >
      <p
        style={{
          fontSize: windowWidth < 600 ? '20px' : '25px',
          padding: '0px 2vw',
          cursor: 'pointer',
        }}
      >
        {quote}
      </p>
    </div>
  )
}

export default Quote
