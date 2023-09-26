import { useMutation } from '@tanstack/react-query'
import {
  addQuoteToQueues,
  monitorQueueLength,
  progressQueryQueue,
} from './helpers'
import { getQuote } from '../services/quoteService'

export const addQuoteToQueue = (queryClient) => {
  return useMutation({
    mutationFn: getQuote,
    onSuccess: (newQuote) => addQuoteToQueues(newQuote, queryClient),
  })
}

export const progressQueuesAndAddQuote = (addQuote, queryClient) => {
  return useMutation({
    mutationFn: getQuote,
    onMutate: () => progressQueryQueue(queryClient),
    onSuccess: (newQuote) => addQuoteToQueues(newQuote, queryClient),
    onSettled: () => monitorQueueLength(addQuote, queryClient),
  })
}
