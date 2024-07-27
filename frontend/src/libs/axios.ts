import axios from 'axios'
import { env } from '/src/config'

const instance = axios.create({
  baseURL: env.BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance
