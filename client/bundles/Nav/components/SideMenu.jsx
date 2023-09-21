import React, { useState } from 'react'
import Login from './Login'
import CreateAccount from './CreateAccount'
import ScoreBoard from './ScoreBoard'

const SideMenu = ({ user, setUser }) => {
    const [collapsed, setCollapsed] = useState(true)
    return (
      <div
        style={{ backgroundColor: 'white', width: '10vw'}}>
        <h2 
          onClick={() => setCollapsed(!collapsed)}
        >
          menu
        </h2>
        <div
          style={{ display: collapsed ? 'none' : 'flex', flexDirection:'column', backgroundColor: 'white', zIndex:'100', position: 'absolute', width: '10vw' }}
        >
          <Login user={user} setUser={setUser} />
          { !user ? <CreateAccount setUser={setUser} /> : null }
          <ScoreBoard />
        </div>
      </div>
    )
  }

  export default SideMenu