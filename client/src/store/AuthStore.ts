import { makeAutoObservable } from 'mobx'
import { LoginDTO } from '../dto/Login.dto'
import { apiClient } from '../service/ApiClient'

export class AuthStore {
  isAuth = false
  token = ''

  constructor() {
    makeAutoObservable(this)
    const token = localStorage.getItem('token')
    if (token) this.init(token)
    window.addEventListener(
      'storage',
      function () {
        const token = localStorage.getItem('token')
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
      },
      false
    )
  }

  async login(dto: LoginDTO) {
    const { data } = await apiClient.post('/login', dto)
    this.saveToken({ token: data })
  }

  private async saveToken(data: { token: string }) {
    this.isAuth = true
    this.token = data.token

    apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    localStorage.setItem('token', this.token)
  }

  async logout() {
    this.isAuth = false
    this.token = ''
    localStorage.removeItem('token')
    apiClient.defaults.headers.common['Authorization'] = ''
  }

  async init(token: string) {
    try {
      await apiClient.get('/auth', {
        headers: { Authorization: `Bearer ${token}` },
      })
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`

      this.isAuth = true
    } catch (error) {
      this.isAuth = false
    }
  }
}

export const authStore = new AuthStore()
