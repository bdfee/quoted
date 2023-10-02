import React from 'react'
import useWindowDimensions from '../../../layoutUtils/useWindowDimensions'
import styles from './Author.module.css'

const Snippet = ({ name, snippet }) => {
  const { width: windowWidth } = useWindowDimensions()

  const responsiveStyle = {
    fontSize: windowWidth < 600 ? '20px' : windowWidth < 1200 ? '25px' : '30px',
  }

  return (
    <div>
      <h3 className={styles['snippet-header']} style={responsiveStyle}>
        {' - ' + name}
      </h3>
      <div className={styles['snippet-text-wrapper']}>
        <p className={styles['snippet-text']}>{snippet}</p>
      </div>
    </div>
  )
}

export default Snippet
