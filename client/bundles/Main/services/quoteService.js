import axios from 'axios'
import { getApiHeaders } from '../../utils/apiHeader'

export const getQuote = async () => {
  const config = {
    headers: getApiHeaders(),
  }
  const { data } = await axios.get('/api/new_quote', config)
  return data
}

// temp
export const getQuotes = async () => {
  const quotes = []

  for (let i = 0; i < 3; i++) {
    const data = await getQuote()
    quotes.push(data)
  }
  return quotes
}
