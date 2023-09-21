import React, { useState } from 'react'
import Login from './Login'
import CreateAccount from './CreateAccount'
import ScoreBoard from './ScoreBoard'

const SideMenu = ({ setLoggedIn }) => {
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
          <Login setLoggedIn={setLoggedIn} />
          <CreateAccount />
          <ScoreBoard />
        </div>
      </div>
    )
  }

  export default SideMenu