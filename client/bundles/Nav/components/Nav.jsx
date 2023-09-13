import React from 'react'
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
        <div>login/account</div>
    </div>
 )
}

export default Nav