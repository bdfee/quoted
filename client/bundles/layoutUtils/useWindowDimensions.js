import { useState, useEffect } from 'react'

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', updateWindowDimensions)

    updateWindowDimensions()

    return () => {
      window.removeEventListener('resize', updateWindowDimensions)
    }
  }, [])

  return windowDimensions
}

export default useWindowDimensions
