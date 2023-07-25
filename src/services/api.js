import axios from 'axios'

const baseURL = 'https://1606080-nodejs.vercel.app/api'

const api = axios.create({
  baseURL
})

export default api