import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import style from './Nav.module.css';
import UserSignature from './UserSignature';
import SideMenu from './SideMenu';

const queryClient = new QueryClient()

const Nav = () => { 
  const [user, setUser] = useState('')

  useEffect(() => {
    const session = localStorage.getItem('quoted-session')
    if (session) {
      const { username } = JSON.parse(session)
      setUser(username)
    }
  },[])

  return (
      <QueryClientProvider client={queryClient}>
        <div className={style.nav}>
          <UserSignature user={user}/>
          <SideMenu user={user} setUser={setUser}/> 
        </div>
      </QueryClientProvider>
  )}

export default Nav