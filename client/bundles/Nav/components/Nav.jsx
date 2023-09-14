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
        <Rankings />
      </div>
    </div>
  )
}

const Rankings = () => {
  const [rankings, setRankings] = useState([])
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    fetch('/api/rankings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => Promise.reject(data));
        }
      })
      .then((data) => {
        setRankings(data)
      })
      .catch((error) => console.error(error));
  }, [])

  return (
    <div>
      <h2
        onClick={() => setCollapsed(!collapsed)}
      >rankings</h2>
      <ol
        style={{ display: collapsed? 'none' : 'block'}}
      >
        {rankings.map(ranking => <li key={ranking.username}> {ranking.username + '-' + ranking.ranking_score}</li>)}
      </ol>
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
  const [user, setUser] = useState('')

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
          data.user_score && setUser(data.user_score.user_id);
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
        {activeSession ? 'ID: ' + user : 'anonymous'}
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