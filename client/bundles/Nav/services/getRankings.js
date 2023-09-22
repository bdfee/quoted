import axios from 'axios'
import { getApiHeaders } from '../../utils/apiHeader'

export const getRankings = async () => {
  const config = {
    headers: getApiHeaders(),
  }

  const { data } = await axios.get('/api/rankings', config)

  return data
}
