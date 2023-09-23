import axios from 'axios'
import { getApiHeaders } from '../../utils/apiHeader'

export const getScores = async () => {
  const config = {
    headers: getApiHeaders({ tryTokenAuth: true }),
  }

  const { data } = await axios.get('/api/scores', config)

  return data
}
