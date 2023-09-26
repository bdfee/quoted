import { useQuery } from '@tanstack/react-query'
import { getQuotes } from '../services/quoteService'
import { getLocalStorageQueue } from '../services/localStorage'

// return local storage, if none fetches three quotes to prime the queue

export const initializeQuoteQueue = () => {
  return useQuery({
    queryKey: ['quote-queue'],
    queryFn: getQuotes,
    initialData: getLocalStorageQueue(),
    staleTime: Infinity,
  })
}
