import React from 'react'

const Author = ({ name, imageUrl, snippet }) => {
  return (
    <>
      <div
        style={{
          border: '1px solid black',
          width: '20vw',
          height: '40vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <img
          src={imageUrl}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
          alt="Author"
        ></img>
      </div>
      <div
        style={{
          fontSize: '25px',
          border: '1px solid black',
        }}
      >
        <h3>{name}</h3>
        <p>{snippet}</p>
      </div>
    </>
  )
}

export default Author
