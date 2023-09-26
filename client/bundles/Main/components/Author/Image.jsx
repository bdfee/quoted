import React from 'react'
import no_image from './no_image.svg'

const Image = ({ imageUrl }) => {
  const source = imageUrl ? imageUrl : no_image

  return (
    <div
      style={{
        overflow: 'hidden', // Hide any overflowing content
        // borderRadius: '50%', // Create rounded corners for an oval portrait effect
      }}
    >
      <img
        src={source}
        style={{
          width: '100%', // Ensure the image takes up the entire container
          height: '100%', // Ensure the image takes up the entire container
          objectFit: 'scale-down', // Maintain aspect ratio and cover the entire container
          objectPosition: 'top',
        }}
        alt="Author"
      />
    </div>
  )
}

export default Image
