import React, { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import Author from './Author'
import Quotes from './Quotes'
import ProgressQueueBtn from './ProgressQueueBtn'
import useWindowDimensions from '../../layoutUtils/useWindowDimensions'

import { initializeQuoteQueue } from '../queries/initializeQuoteQueue'
import {
  addQuoteToQueue,
  progressQueuesAndAddQuote,
} from '../mutations/addQuote'

const Game = () => {
  const queryClient = useQueryClient()
  const [randomizer, setRandomizer] = useState(Math.random())
  const [guessed, setGuessed] = useState(false)
  const { width: windowWidth } = useWindowDimensions()

  const { data: quoteQueue, status } = initializeQuoteQueue()
  const { mutate: addQuote } = addQuoteToQueue(queryClient)
  const { mutate: progressQuoteQueue } = progressQueuesAndAddQuote(
    addQuote,
    queryClient
  )

  const handleProgressQueue = () => {
    setRandomizer(Math.random())
    progressQuoteQueue()
    setGuessed(false)
  }

  const mainStyle = () => {
    const gridTemplateRows =
      windowWidth < 600 ? '45vh 20vh 10vh' : '35vh 44vh 5vh'
    return {
      display: 'grid',
      girdTemplateColumns: '30vw 70vw',
      gridTemplateRows,
      backgroundColor: 'white',
    }
  }

  if (status === 'loading' || status === 'error') {
    return <div>{status}</div>
  }

  const [{ author, image_url, snippet, quote, false_quote }] = quoteQueue

  return (
    <div style={mainStyle()}>
      <Quotes
        quote={quote}
        falseQuote={false_quote}
        randomizer={randomizer}
        guessed={guessed}
        setGuessed={setGuessed}
      />

      <Author name={author} imageUrl={image_url} snippet={snippet} />
      <ProgressQueueBtn progressQueue={handleProgressQueue} />
    </div>
  )
}

export default Game
