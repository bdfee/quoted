import React from 'react'
import CreateAccount from './CreateAccount'
import style from './Nav.module.css'

const Nav = () => {

 return (
    <div
        className={style.nav}
    >
        <h2
            style={{marginLeft: '2vw'}}
        >quoted</h2>
        <div>score</div>
        <CreateAccount />
    </div>
 )
}

export default Nav