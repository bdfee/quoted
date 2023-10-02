import React from 'react'
import useWindowDimensions from '../../layoutUtils/useWindowDimensions'
import styles from './Main.module.css'

const Quote = ({ quote, handleClick, index, revealStyle }) => {
  const { width: windowWidth } = useWindowDimensions()

  const responsiveStyle = {
    fontSize: windowWidth < 600 ? '20px' : '25px',
  }

  return (
    <div
      className={styles['quote-tile']}
      style={{
        ...revealStyle,
      }}
      onClick={() => handleClick(index)}
    >
      <p className={styles['quote-text']} style={responsiveStyle}>
        {quote}
      </p>
    </div>
  )
}

export default Quote
