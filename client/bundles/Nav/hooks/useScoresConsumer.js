import scoresConsumer from '../services/scoresConsumer'
import { useEffect } from 'react'

export const useScoresConsumer = (queryClient) => {
  useEffect(() => {
    const subscription = scoresConsumer.subscriptions.create('ScoresChannel', {
      connected() {
        console.log('Connected to ScoresChannel')
      },
      received(data) {
        if (data) {
          console.log('Received data from ScoresChannel:', data)
          queryClient.setQueryData(['scores'], {
            user_score: data.user_score,
            global_score: data.global_score,
          })
        }
      },
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])
}
