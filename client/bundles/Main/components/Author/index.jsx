import React from 'react'
import Image from './Image'
import Snippet from './Snippet'
import useWindowDimensions from '../../../layoutUtils/useWindowDimensions'

const Author = ({ name, imageUrl, snippet }) => {
  const { width: windowWidth } = useWindowDimensions()

  const style = {
    display: 'grid',
    width: '100vw',
    height: '100%',
    gridTemplateColumns: '25% 75%',
    paddingBottom: '1vh',
    overflow: 'hidden',
  }

  return (
    <div style={style}>
      <Image imageUrl={imageUrl} />
      <Snippet name={name} snippet={snippet} />
    </div>
  )
}

export default Author
