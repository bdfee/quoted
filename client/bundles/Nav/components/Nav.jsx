import React, { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserSignature from './UserSignature'
import Menu from './Menu'
import useWindowDimensions from '../../layoutUtils/useWindowDimensions'

const queryClient = new QueryClient()

const Nav = () => {
  const [user, setUser] = useState('')

  const { width: windowWidth } = useWindowDimensions()

  const navStyle = {
    display: 'grid',
    gridTemplateColumns: windowWidth > 775 ? '80vw 10vw' : '70vw 20vw',
    gridTemplateRows: '10vh',
    backgroundColor: 'white',
    padding: '0 5vw',
  }

  const navWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
  }

  useEffect(() => {
    const session = localStorage.getItem('quoted-session')
    if (session) {
      const { username } = JSON.parse(session)
      setUser(username)
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <div style={navWrapperStyle}>
        <div style={navStyle}>
          <UserSignature user={user} />
          <Menu user={user} setUser={setUser} />
        </div>
      </div>
    </QueryClientProvider>
  )
}

export default Nav
