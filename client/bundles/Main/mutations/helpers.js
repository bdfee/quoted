import { setLocalStorageQueue } from '../services/localStorage'

export const addQuoteToQueues = (newQuote, queryClient) => {
  queryClient.setQueryData(['quote-queue'], (existingQueue) => {
    const newQueue = existingQueue.concat(newQuote)
    setLocalStorageQueue(newQueue)
    return newQueue
  })
}

export const monitorQueueLength = (addQuote, queryClient) => {
  const queueLength = queryClient.getQueryData(['quote-queue']).length

  if (queueLength < 4) {
    addQuote()
  }
}

export const progressQueryQueue = (queryClient) => {
  queryClient.setQueryData(['quote-queue'], ([_, ...rest]) => rest)
}
