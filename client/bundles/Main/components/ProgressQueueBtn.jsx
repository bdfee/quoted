import React from 'react'

const NextQueueBtn = ({ progressQueue }) => (
  <button
    style={{
      width: '100%',
    }}
    onClick={progressQueue}
  >
    next quote
  </button>
)

export default NextQueueBtn
