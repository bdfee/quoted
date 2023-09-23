import React, { useState } from 'react'
import Login from './Login'
import CreateAccount from './CreateAccount'
import Scores from '../Scores'
import MenuItem from './MenuItem'
import SubMenuHeader from './SubMenuHeader'
import SubMenuContentWrapper from './SubMenuContentWrapper'
import './Menu.module.css'
import useWindowDimensions from '../../../layoutUtils/useWindowDimensions'

const Menu = ({ user, setUser }) => {
  const [collapsed, setCollapsed] = useState({
    menu: true,
    login: true,
    signup: true,
    score: true,
  })

  const { width: windowWidth } = useWindowDimensions()

  const handleCollapsed = (key) =>
    setCollapsed({ ...collapsed, [key]: !collapsed[key] })

  const handleLogout = () => {
    localStorage.removeItem('quoted-session')
    setUser('')
    console.log('click')
  }

  const menuStyle = {
    height: '10vh',
  }

  return (
    <div>
      <div style={menuStyle}>
        <button
          type="button"
          onClick={() => handleCollapsed('menu')}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          menu
        </button>
      </div>
      <div
        style={{
          display: collapsed.menu ? 'none' : 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          zIndex: '100',
          position: 'absolute',
          width: windowWidth > 774 ? '10vw' : '20vw',
        }}
      >
        <MenuItem>
          <SubMenuHeader
            title="scores"
            handler={() => handleCollapsed('score')}
          />
          <SubMenuContentWrapper collapsed={collapsed.score} position={0}>
            <Scores />
          </SubMenuContentWrapper>
        </MenuItem>
        <MenuItem>
          {user ? (
            <SubMenuHeader title="logout" handler={handleLogout} />
          ) : (
            <>
              <SubMenuHeader
                title="login"
                handler={() => handleCollapsed('login')}
              />
              <SubMenuContentWrapper collapsed={collapsed.login} position={1}>
                <Login user={user} setUser={setUser} />
              </SubMenuContentWrapper>
            </>
          )}
        </MenuItem>
        <MenuItem>
          {user ? null : (
            <>
              <SubMenuHeader
                title="signup"
                handler={() => handleCollapsed('signup')}
              />
              <SubMenuContentWrapper collapsed={collapsed.signup} position={2}>
                <CreateAccount setUser={setUser} />
              </SubMenuContentWrapper>
            </>
          )}
        </MenuItem>
      </div>
    </div>
  )
}

export default Menu
