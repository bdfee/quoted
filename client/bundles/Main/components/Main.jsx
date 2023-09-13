import React from 'react'
import style from './Main.module.css'
import { useState, useEffect } from 'react'


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
      if (token) {
        updateScore(idx, token)
      }
    };
    
    const updateScore = async (idx, token) => {
      fetch('/api/scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        },
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


const Main = () => {
    const [quote, setQuote] = useState([])

    useEffect(() => {
        fetch('/api/new_quote', {
            method: 'GET'
        })
        .then(response => response.json())
        .then((result) => {
            setQuote([result]);
        })
    }, [])

    return (
        <div className={style.container}>    
            <div className={style.main}>
                {quote.length > 0 && (
                    <>
                        <Author name={quote[0].author} imageUrl={quote[0].image_url} snippet={quote[0].snippet} />
                        <div
                            style={{
                                gridRowStart: 2,
                                gridColumnStart: 1,
                                gridColumnEnd: 3,
                            }}
                        >
                            <Quotes quote={quote[0].quote} falseQuote={quote[0].false_quote} />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Main
