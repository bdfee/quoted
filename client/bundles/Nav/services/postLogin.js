import axios from 'axios'
import { getApiHeaders } from '../../utils/apiHeader'

export const postLogin = async ({ username, password }) => {
  const config = {
    headers: getApiHeaders(),
  }

  const body = JSON.stringify({
    session: { username, password },
  })

  const { data } = await axios.post('/api/signin', body, config)

  return data
}
