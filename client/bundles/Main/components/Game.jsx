import React, { useState } from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getQuote, getQuotes } from '../services/quoteService'
import Author from './Author'
import Quotes from './Quotes'
import style from './Main.module.css'

const Game = () => {
  const queryClient = useQueryClient()
  const [randomizer, setRandomizer] = useState(Math.random())
  const [guessed, setGuessed] = useState(false)

  // prime the quote queue with 3 payloads before rendering component
  // todo revise to dedicated endpoint once client is a bit more formed
  const { data: quoteQueue, status } = useQuery({
    queryKey: ['quote-queue'],
    queryFn: getQuotes,
    staleTime: Infinity,
  })

  // onMutate progress the queue, on mutation success add the payload
  const { mutate: mutateQuoteQuery } = useMutation({
    mutationFn: getQuote,
    onMutate: () =>
      queryClient.setQueryData(['quote-queue'], ([_, b, c]) => [b, c]),
    onSuccess: (newQuote) =>
      queryClient.setQueryData(['quote-queue'], ([a, b]) => [a, b, newQuote]),
  })

  const handleProgressQueue = () => {
    setRandomizer(Math.random())
    mutateQuoteQuery()
    setGuessed(false)
  }

  if (status === 'loading' || status === 'error') {
    return <div>{status}</div>
  }

  const [{ author, image_url, snippet, quote, false_quote }] = quoteQueue

  return (
    <div className={style.container}>
      <div className={style.main}>
        <Author name={author} imageUrl={image_url} snippet={snippet} />
        <Quotes
          quote={quote}
          falseQuote={false_quote}
          randomizer={randomizer}
          guessed={guessed}
          setGuessed={setGuessed}
        />
        <button
          style={{
            position: 'absolute',
            top: '90vh',
            left: '90vw',
          }}
          onClick={handleProgressQueue}
        >
          next quote
        </button>
      </div>
    </div>
  )
}

export default Game
