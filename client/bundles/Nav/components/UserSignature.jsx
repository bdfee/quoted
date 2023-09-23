import React from 'react'

const UserSignature = ({ user }) => (
  <h2 style={{ marginBlock: '8px' }}>{user ? user : 'anonymous'}</h2>
)

export default UserSignature
