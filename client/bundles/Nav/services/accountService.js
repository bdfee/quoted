import axios from 'axios'
import { getApiHeaders } from '../../utils/apiHeader'

export const postAccount = async ({ username, password }) => {
  const config = {
    headers: getApiHeaders(),
  }

  const body = JSON.stringify({
    user: { username, password },
  })

  const { data } = await axios.post('/api/users', body, config)

  return data
}
