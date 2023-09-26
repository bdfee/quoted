import React, { useState } from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getQuote, getQuotes } from '../services/quoteService'
import Author from './Author'
import Quotes from './Quotes'
import ProgressQueueBtn from './ProgressQueueBtn'
import useWindowDimensions from '../../layoutUtils/useWindowDimensions'
import {
  setLocalStorageQueue,
  getLocalStorageQueue,
} from '../services/localStorage'

const Game = () => {
  const queryClient = useQueryClient()
  const [randomizer, setRandomizer] = useState(Math.random())
  const [guessed, setGuessed] = useState(false)
  const { width: windowWidth } = useWindowDimensions()
  // prime the quote queue with 3 payloads before rendering component
  // todo revise to dedicated endpoint once client is a bit more formed

  // return local storage, if none fetches three quotes to prime the queue
  // TODO suspense for initial hard fetch experience
  const { data: quoteQueue, status } = useQuery({
    queryKey: ['quote-queue'],
    queryFn: getQuotes,
    initialData: getLocalStorageQueue(),
    staleTime: Infinity,
  })

  // mutation that concats a quote to the quote without progression
  const { mutate: addQuote } = useMutation({
    mutationFn: getQuote,
    onSuccess: (newQuote) => addQuoteToQueues(newQuote),
  })

  // mutation that progresses both queues, fetches 1 quote, and calls the queue length monitor
  const { mutate: progressQuoteQueue } = useMutation({
    mutationFn: getQuote,
    onMutate: () =>
      queryClient.setQueryData(['quote-queue'], ([_, ...rest]) => rest),
    onSuccess: (newQuote) => addQuoteToQueues(newQuote),
    onSettled: () => monitorQueueLength(addQuote),
  })

  const addQuoteToQueues = (newQuote) => {
    queryClient.setQueryData(['quote-queue'], (existingQueue) => {
      const newQueue = existingQueue.concat(newQuote)
      setLocalStorageQueue(newQueue)
      return newQueue
    })
  }

  const monitorQueueLength = () => {
    const queueLength = queryClient.getQueryData(['quote-queue']).length
    if (queueLength < 5) {
      addQuote()
    }
  }

  const handleProgressQueue = () => {
    setRandomizer(Math.random())
    progressQuoteQueue()
    setGuessed(false)
  }

  const mainStyle = () => {
    const gridTemplateRows =
      windowWidth < 600 ? '55vh 24vh 5vh' : '35vh 44vh 5vh'
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
