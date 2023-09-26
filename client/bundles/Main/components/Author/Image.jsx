import React from 'react'
import no_image from './no_image.svg'

const Image = ({ imageUrl }) => {
  const source = imageUrl ? imageUrl : no_image

  return (
    <div
      style={{
        overflow: 'hidden',
      }}
    >
      <img
        src={source}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'scale-down',
          objectPosition: 'top',
        }}
        alt="Author"
      />
    </div>
  )
}

export default Image
