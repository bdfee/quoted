import React, { useState } from 'react'
import Login from './Login'
import CreateAccount from './CreateAccount'
import Scores from '../Scores'
import MenuItem from './MenuItem'
import SubMenuHeader from './SubMenuHeader'
import SubMenuContentWrapper from './SubMenuContentWrapper'
import styles from './Menu.module.css'
import useWindowDimensions from '../../../layoutUtils/useWindowDimensions'

const Menu = ({ user, setUser }) => {
  const [collapsed, setCollapsed] = useState({
    menu: true,
    login: true,
    signup: true,
    score: true,
  })

  const { width: windowWidth } = useWindowDimensions()

  const responsiveMenuItems = {
    display: collapsed.menu ? 'none' : 'flex',
    width: windowWidth > 774 ? '15vw' : '25vw',
  }

  const handleCollapsed = (key) =>
    setCollapsed({ ...collapsed, [key]: !collapsed[key] })

  const handleLogout = () => {
    localStorage.removeItem('quoted-session')
    setUser('')
  }

  return (
    <div>
      <div className={styles['menu-header-wrapper']}>
        <button
          className={styles['menu-header']}
          type="button"
          onClick={() => handleCollapsed('menu')}
        >
          menu
        </button>
      </div>
      <div className={styles['menu-items']} style={responsiveMenuItems}>
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
