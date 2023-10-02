import React from 'react'
import { postScore } from '../services/scoreService'
import Quote from './Quote'
import { useQueryClient } from '@tanstack/react-query'
import { progressLocalStorageQueue } from '../services/localStorage'
import styles from './Main.module.css'

const Quotes = ({ quote, falseQuote, guessed, setGuessed, randomizer }) => {
  const queryClient = useQueryClient()

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
    progressLocalStorageQueue(queryClient)
  }

  return (
    <div className={styles['quote-tiles-wrapper']}>
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
