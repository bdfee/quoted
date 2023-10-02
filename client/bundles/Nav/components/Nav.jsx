import React, { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserSignature from './UserSignature'
import Menu from './Menu'
import useWindowDimensions from '../../layoutUtils/useWindowDimensions'
import styles from './Nav.module.css'

const queryClient = new QueryClient()

const Nav = () => {
  const [user, setUser] = useState('')

  const { width: windowWidth } = useWindowDimensions()

  const responsiveStyle = {
    gridTemplateColumns: windowWidth > 775 ? '85vw 15vw' : '75vw 25vw',
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
      <div className={styles['nav-wrapper']}>
        <div className={styles['nav']} style={responsiveStyle}>
          <UserSignature user={user} />
          <Menu user={user} setUser={setUser} />
        </div>
      </div>
    </QueryClientProvider>
  )
}

export default Nav
