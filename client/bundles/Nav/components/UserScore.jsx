import React from 'react'

const UserScore = ({ userScore }) => userScore && (
    <p
      style={{fontSize: '25px', textJustify: 'center', textAlign: 'center'}}
    >
      {"Humans: " + userScore.correct_responses + " | Machine: " + userScore.incorrect_responses }
    </p>
  )

  export default UserScore