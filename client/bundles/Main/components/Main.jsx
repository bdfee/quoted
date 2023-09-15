import React from 'react'
import style from './Main.module.css'
import { useState, useEffect, useRef } from 'react'
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const Author = ({author, imageUrl, snippet}) => {
    return ( 
        <>
            <div
                style={{
                    border: '1px solid black',
                    width: '20vw',
                    height: '40vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}>
                <img
                    src={imageUrl}
                    style={{
                        maxWidth: '100%', 
                        maxHeight: '100%',
                        objectFit: 'contain'
                      }}
                    alt="Author"
                ></img>
            </div>
            <div
                style={{
                    fontSize: '25px',
                    border: '1px solid black',
                }}
                >
                <h3>{author}</h3>
                <p>{snippet}</p>
            </div>
        </>
    )
}

const Quote = ({ quote, handleClick, revealStyle, index }) => {
    const baseStyle = {
      border: '1px solid black',
      height: '20vh',
      fontSize: '25px'
    };
  
    const mergedStyle = { ...baseStyle, ...revealStyle };
  
    return (
      <div
        style={mergedStyle}
        onClick={() => handleClick(index)} // Pass the index directly to handleClick
      >
        {quote}
      </div>
    );
  };
  
  const Quotes = ({ quote, falseQuote, progressQueue }) => {
    const [guessIdx, setGuessIdx] = useState(null);
    const [randomizer, setRandomizer] = useState(Math.random())
    
    const updateScore = async (idx, token) => {

      const isCorrect =
        (randomizer < 0.5 && guessIdx === 0) ||
        (randomizer >= 0.5 && guessIdx === 1);

      // global headers
      const headers = {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      }
      // if logged in user
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      fetch('/api/scores', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          score_type: isCorrect ? 'correct' : 'incorrect'
        })
      }).then(res => {
        if (res.ok) {
          // setRandomizer(Math.random())
          // setGuessIdx(null)
        }
      })
    }

    const reveal = (idx) => ({
      backgroundColor:
        (randomizer < 0.5 && idx === 0) ||
        (randomizer >= 0.5 && idx === 1)
          ? 'green'
          : 'red',
    });
    
    const quotesArr = randomizer > 0.5 ? [quote, falseQuote + 'false'] : [falseQuote, quote]

    const handleClick = async (idx) => {
      setGuessIdx(idx);
      const token = window.localStorage.getItem('quoted-session')
      updateScore(idx, token)
    };

    const handleProgressQueue = () => {
      setRandomizer(Math.random())
      setGuessIdx(null)
      progressQueue()
    }

    console.log(randomizer)
    return (
      <>
        <div>
          <button
            onClick={handleProgressQueue}
          >next quote</button>
        </div>
        {quotesArr.map((quote, idx) => (
          <Quote
            quote={quote}
            key={'quote-' + idx}
            handleClick={handleClick}
            revealStyle={guessIdx !== null ? reveal(idx) : {}}
            index={idx} // Pass the index to the Quote component
          />
        ))}
      </>
    )
  };

  

  const fetchQuotes = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch('/api/new_quote', {
          method: 'GET',
        });
        const data = await res.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

const Game = () => {
  const quoteQueueRef = useRef([])
  const [quote, setQuote] = useState({})
  const queryClient = useQueryClient()
    
  const fetchNewQuote = async () => queryClient.fetchQuery(['quotes'], fetchQuotes)

  useQuery({
    queryKey: ['quotes'], 
    queryFn: fetchQuotes,
    onSuccess: (quote) => addQuoteToQueue(quote),
  })

  useQuery({
    enabled: quoteQueueRef.current.length < 2,
    queryKey: ['quote-queue-primer'],
    queryFn: fetchQuotes,
    onSuccess: (quote) => addQuoteToQueue(quote)
  })

  const addQuoteToQueue = (quoteObj) => quoteQueueRef.current.push(quoteObj)

  const progressQueue = () => setQuote(quoteQueueRef.current.shift())

  const handleClick = async () => {
    progressQueue()
    fetchNewQuote()
  }

  return (
    <div className={style.main}>
      <Author name={quote.author} imageUrl={quote.image_url} snippet={quote.snippet} />
      <button onClick={handleClick}>progress queue</button> 
      <div
          style={{
              gridRowStart: 2,
              gridColumnStart: 1,
              gridColumnEnd: 3,
          }}
      >
        <Quotes quote={quote.quote} falseQuote={quote.false_quote} progressQueue={handleClick} />
      </div>
    </div>
  )
}




const Main = () => (
  <QueryClientProvider client={queryClient}> 
      <div className={style.container}>  
        <Game />
      </div>
      <ReactQueryDevtools initialIsOpen={true} />
  </QueryClientProvider>
)


export default Main
