import React, { useEffect, useState } from 'react';
import CreateAccount from './CreateAccount';
import Login from './Login';
import style from './Nav.module.css';
import scoresConsumer from './scoresConsumer';

const Nav = () => {
  const [activeSession, setActiveSession] = useState(false);
  const [score, setScore] = useState(null);

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

        if (data && data.score) {
          console.log('Received data from ScoresChannel:', data);
          setScore(data.score);
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
      >{score && "Human: " + score.correct_responses + " | Machine: " + score.incorrect_responses}</h2>
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