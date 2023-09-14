import React, { useEffect, useState } from 'react';
import CreateAccount from './CreateAccount';
import Login from './Login';
import style from './Nav.module.css';
import scoresConsumer from './scoresConsumer';

const SideMenu = ({ setActiveSession }) => {
  const [collapsed, setCollapsed] = useState(false)
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
        <Login setActiveSession={setActiveSession} />
        <CreateAccount />
        <div>Rankings</div>
      </div>
    </div>
  )
}

const GlobalScore = ({ globalScore }) => {
  if (globalScore) {
    return (
      <p
        style={{fontSize: '25px', textJustify: 'center', textAlign: 'center'}}
      >
        {"Humans: " + globalScore.correct_responses + " | Machine: " + globalScore.incorrect_responses }
      </p>
    )
  }
}

const UserScore = ({ userScore }) => {
  if (userScore) {
    return (
      <p
        style={{fontSize: '25px', textJustify: 'center', textAlign: 'center'}}
      >
        {"Humans: " + userScore.correct_responses + " | Machine: " + userScore.incorrect_responses }
      </p>
    )
  }
}

const Nav = () => {
  const [activeSession, setActiveSession] = useState(false);
  const [userScore, setUserScore] = useState(null);
  const [globalScore, setGlobalScore] = useState(null)

  useEffect(() => {
    if (window.localStorage.getItem('quoted-session')) {
      setActiveSession(true);
    }
  }, []);

  useEffect(() => {
    const subscription = scoresConsumer.subscriptions.create('ScoresChannel', {
      connected() {
        console.log('Connected to ScoresChannel');
      },
      received(data) {

        if (data) {
          console.log('Received data from ScoresChannel:', data);
          data.user_score && setUserScore(data.user_score);
          data.global_score && setGlobalScore(data.global_score)
        }
      },
    });

    return () => {
      subscription.unsubscribe(); 
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('quoted-session');
    setActiveSession(false);
  };

  return (
    <div className={style.nav}>
      <h2
        style={{
          marginLeft: '2vw',
          textJustify: 'center',
        }}
      >
        anon or username
      </h2>
      <div style={{display: 'flex', justifyContent:'space-around'}}>
        <GlobalScore globalScore={globalScore} />
        <UserScore userScore={userScore} />
      </div>
      <div>
        {activeSession ? (
          <>
            <h2>logged in</h2>
            <div>
              <button type="button" onClick={handleSignOut}>
                logout
              </button>
            </div>
          </>
        ) : (
        <SideMenu setActiveSession={setActiveSession}/>
        )}
      </div>
    </div>
  );
};

export default Nav;