import React from 'react'
import { postScore } from '../services/scoreService'
import Quote from './Quote'

const Quotes = ({ quote, falseQuote, guessed, setGuessed, randomizer }) => {
  const isCorrect = (idx) =>
    (randomizer >= 0.5 && idx === 1) || (randomizer < 0.5 && idx === 0)
  const quotesArr =
    randomizer > 0.5 ? [falseQuote, `"${quote}"`] : [`"${quote}"`, falseQuote]

  const revealStyle = (idx) => ({
    borderColor: isCorrect(idx) ? 'green' : 'red',
  })

  const handleClick = async (idx) => {
    setGuessed(true)
    postScore(isCorrect(idx))
  }

  return (
    <div
      style={{
        gridRowStart: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '3vh',
        margin: '0 1vw',
        overflowX: 'hidden',
      }}
    >
      {quotesArr.map((quote, idx) => (
        <Quote
          quote={quote}
          key={'quote-' + idx}
          handleClick={handleClick}
          revealStyle={guessed ? revealStyle(idx) : {}}
          index={idx}
        />
      ))}
    </div>
  )
}

export default Quotes
