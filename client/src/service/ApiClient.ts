import axios from 'axios'

export const apiClient = axios.create({
  baseURL: '/',
})

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)
