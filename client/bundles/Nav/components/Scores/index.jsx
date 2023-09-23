import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Score from './Score'
import Rankings from './Rankings'
import { getScores } from '../../services/scoreService'
import { useScoresConsumer } from '../../hooks/useScoresConsumer'

const Scores = () => {
  const queryClient = useQueryClient()

  useScoresConsumer(queryClient)

  const { data: scores, status } = useQuery({
    queryFn: getScores,
    queryKey: ['scores'],
    staleTime: Infinity,
  })

  if (status === 'loading' || status === 'error') {
    return <div>{status}</div>
  }

  return (
    <>
      <Score score={scores.user_score} title="my score" />
      <Score score={scores.global_score} title="global score" />
      <Rankings />
    </>
  )
}

export default Scores
