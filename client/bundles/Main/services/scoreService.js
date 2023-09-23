import axios from 'axios'
import { getApiHeaders } from '../../utils/apiHeader'

export const postScore = async (isCorrect) => {
  const config = {
    headers: getApiHeaders({ tryTokenAuth: true }),
  }

  const body = JSON.stringify({
    score_type: isCorrect ? 'correct' : 'incorrect',
  })

  const { data } = await axios.post('/api/scores', body, config)

  return data
}
