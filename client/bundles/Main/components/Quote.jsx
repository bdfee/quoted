import React from 'react'

const Quote = ({ quote, handleClick, index, revealStyle }) => (
    <div
      style={revealStyle}
      onClick={() => handleClick(index)}
    >
      {quote}
    </div>
)

export default Quote