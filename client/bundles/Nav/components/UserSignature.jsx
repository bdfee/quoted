import React from 'react'

const UserSignature = ({ user }) => (
    <h2
      style={{
        marginLeft: '2vw',
        textJustify: 'center',
      }}
    >
    {user ? user : 'anonymous'}
    </h2>
  )

export default UserSignature