import React from 'react'

const GlobalScore = ({ globalScore }) => globalScore && (
    <p
      style={{fontSize: '25px', textJustify: 'center', textAlign: 'center'}}
    >
      {"Humans: " + globalScore.correct_responses + " | Machine: " + globalScore.incorrect_responses }
    </p>
  )

  export default GlobalScore