import React, { useEffect, useState } from 'react'
import CreateAccount from './CreateAccount'
import Login from './Login'
import style from './Nav.module.css'

const Nav = () => {
    const [activeSession, setActiveSession] = useState(false)

    useEffect(() => {
        if (window.localStorage.getItem('quoted-session')) {
            setActiveSession(true)
        }
    }, [])


    const handleSignOut = () => {
        localStorage.removeItem('quoted-session')
        setActiveSession(false)
    }
    
    return (
        <div
            className={style.nav}
        >
            <h2
                style={{
                    marginLeft: '2vw',
                    textJustify: 'center'
                }}
            >
                quoted
            </h2>
            <div>score</div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textJustify: 'center'
            }}>
                {
                    activeSession 
                    ?   <>
                            <h2>logged in</h2>
                            <div>
                                <button type="button" onClick={handleSignOut}>logout</button>
                            </div>
                            
                        </>
                    
                    :   <>            
                            <CreateAccount />
                            <Login setActiveSession={setActiveSession}/>
                        </>
                }
            </div>
        </div>
    )
}

export default Nav