import { fetchQuote } from './fetchQuote'

export const fetchQuotes = async () => {
  try {
    const quotes = []

    for (let i = 0; i < 3; i++) {
      const data = await fetchQuote()
      quotes.push(data)
    }

    return quotes
  } catch (error) {
    throw error
  }
}
