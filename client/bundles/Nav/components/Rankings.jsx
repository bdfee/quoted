import React, { useState, useEffect } from 'react'

const Rankings = () => {
    const [rankings, setRankings] = useState([])
    const [collapsed, setCollapsed] = useState(true)
  
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
  

  export default Rankings