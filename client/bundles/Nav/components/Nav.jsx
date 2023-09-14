import React, { useEffect, useState } from 'react';
import CreateAccount from './CreateAccount';
import Login from './Login';
import style from './Nav.module.css';
import scoresConsumer from './scoresConsumer';

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
        quoted
      </h2>
      <h2
        style={{fontSize: '25px', textJustify: 'center', textAlign: 'center'}}
      >
        {userScore && "Human: " + userScore.correct_responses + " | Machine: " + userScore.incorrect_responses } <br></br>
        {globalScore && "Humans: " + globalScore.correct_responses + " | Machine: " + globalScore.incorrect_responses}
      
      </h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textJustify: 'center',
        }}
      >
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
          <>
            <CreateAccount />
            <Login setActiveSession={setActiveSession} />
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;