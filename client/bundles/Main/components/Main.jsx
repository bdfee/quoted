import React from 'react'
import style from './Main.module.css'
import { useState, useEffect } from 'react'
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
  
  const Quotes = ({ quote, falseQuote }) => {
    const [trueIdx, setTrueIdx] = useState(null);
    const [guessIdx, setGuessIdx] = useState(null);
    const [quotes, setQuotes] = useState([]);

    
    useEffect(() => {
      if (Math.random() < 0.5) {
        setTrueIdx(0);
        setQuotes([`"${quote}"`, falseQuote]);
      } else {
        setTrueIdx(1);
        setQuotes([falseQuote, `"${quote}"`]);
      }
    }, []);
    
    const handleClick = async (idx) => {
      setGuessIdx(idx);
      const token = window.localStorage.getItem('quoted-session')
      updateScore(idx, token)
    };
    
    const updateScore = async (idx, token) => {

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
          score_type: idx === trueIdx ? 'correct' : 'incorrect'
        })
      })
    }

    const reveal = (idx) => ({ backgroundColor: idx === trueIdx ? 'green' : 'red' });
  
    return quotes.map((quote, idx) => (
      <Quote
        quote={quote}
        key={'quote-' + idx}
        handleClick={handleClick}
        revealStyle={guessIdx !== null ? reveal(idx) : {}}
        index={idx} // Pass the index to the Quote component
      />
    ));
  };

  

const fetchQuotes = async () => {
    const res = await fetch('/api/new_quote', {
      method: 'GET'
    })
    const data = await res.json()
    return data
  }

const Game = () => {
  const [quoteQueue, setQuoteQueue] = useState([])
  const queryClient = useQueryClient()


  useQuery({
    enabled: quoteQueue.length < 3,
    queryKey: ['quotes'], 
    queryFn: fetchQuotes,
    onSuccess: (quote) => setQuoteQueue(quoteQueue.concat(quote)),
    dependencies: [quoteQueue]
  })  

  const handleClick = async () => {
    // progress queue
    setQuoteQueue(prevQueue => {
      const [ _, ...progressedQueue ] = prevQueue
      return progressedQueue
    })
    await queryClient.prefetchQuery({
      queryKey: ['quotes'],
      queryFn: fetchQuotes
    })

  }

  if (!quoteQueue.length) {
    return <div>loading</div>
  } else {

    console.log(quoteQueue)
    return (
      <div className={style.main}>
        <Author name={quoteQueue[0].author} imageUrl={quoteQueue[0].image_url} snippet={quoteQueue[0].snippet} />
        <button onClick={handleClick}>prefetch</button> 
        <div
            style={{
                gridRowStart: 2,
                gridColumnStart: 1,
                gridColumnEnd: 3,
            }}
        >
          <Quotes quote={quoteQueue[0].quote} falseQuote={quoteQueue[0].false_quote} />
        </div>
      </div>
    )
  }
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
