import React from 'react'

const Score = ({ score, title }) =>
  score && (
    <>
      <h3>{title}</h3>
      <span>
        ~{' '}
        {(
          (score.correct_responses /
            (score.correct_responses + score.incorrect_responses)) *
          100
        ).toFixed()}{' '}
        %
      </span>
      <br />
      <span>
        {score.correct_responses + ' correct'}
        {' / '}
        {score.incorrect_responses + ' incorrect'}
      </span>
    </>
  )

export default Score
