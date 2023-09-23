import React from 'react'

const SubMenuHeader = ({ title, handler }) => (
  <div
    style={{
      height: '10vh',
    }}
  >
    <button
      onClick={handler}
      type="button"
      style={{ width: '100%', height: '100%' }}
    >
      {title}
    </button>
  </div>
)

export default SubMenuHeader
