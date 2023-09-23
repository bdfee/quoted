import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getRankings } from '../../services/getRankings'

const Rankings = () => {
  const { data: rankings, status } = useQuery({
    queryFn: getRankings,
    queryKey: ['rankings'],
  })

  if (status === 'loading' || status === 'error') {
    return <div>{status}</div>
  }

  return (
    <div>
      <h3>rankings</h3>
      <ol>
        {rankings.map((ranking) => (
          <li key={ranking.username}>
            {ranking.username + '-' + ranking.ranking_score}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Rankings
