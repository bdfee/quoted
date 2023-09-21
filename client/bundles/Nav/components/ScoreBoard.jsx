import React, { useState, useEffect } from 'react'
import scoresConsumer from '../services/scoresConsumer';
import UserScore from './UserScore';
import GlobalScore from './GlobalScore';
import Rankings from './Rankings';

const ScoreBoard = () => {
    const [userScore, setUserScore] = useState(null);
    const [globalScore, setGlobalScore] = useState(null)
    const [user, setUser] = useState('')
  
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
  
    return (
      <>
        <UserScore userScore={userScore} />
        <GlobalScore globalScore={globalScore} />
        <Rankings />
      </>
    )
  }

  export default ScoreBoard