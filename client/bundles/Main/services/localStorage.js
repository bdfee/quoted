export const setLocalStorageQueue = (quoteQueue) => {
  return localStorage.setItem('quote-queue', JSON.stringify(quoteQueue))
}

export const getLocalStorageQueue = () => {
  const queue = localStorage.getItem('quote-queue')
  if (queue) {
    return JSON.parse(queue)
  }
}

export const progressLocalStorageQueue = (queryClient) => {
  const existingQueue = queryClient.getQueryData(['quote-queue'])

  if (existingQueue) {
    const [a, ...rest] = existingQueue
    return setLocalStorageQueue(rest)
  }
}
