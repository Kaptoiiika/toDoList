import { reaction, makeAutoObservable } from 'mobx'
import { parseBackendError } from '../../utils/parseBackendError'
import { isNotEmpty } from '../../utils/validator'
import { authStore, AuthStore } from '../AuthStore'

type LoginFormError = { username: string; password: string; message: string }
class LoginFormStore {
  username: string | undefined
  password: string | undefined

  loginOpen = false
  counter = 0
  error: LoginFormError | undefined

  constructor(private authStore: AuthStore) {
    makeAutoObservable(this)
    reaction(
      () => [this.username, this.password],
      () => {
        if (this.counter) this.checkError()
      }
    )
  }

  setLoginOpen(isOpen: boolean) {
    this.loginOpen = isOpen
  }

  setUsername(value: string) {
    this.username = value
  }

  setPassword(value: string) {
    this.password = value
  }

  async tryLogin() {
    this.counter++
    this.checkError()
    if (!this.username || !this.password) return
    try {
      await this.authStore.login({
        username: this.username,
        password: this.password,
      })
      this.clearForm()
    } catch (error: any) {
      this.error = parseBackendError(error)
    }
  }

  clearForm() {
    this.counter = 0
    this.username = ''
    this.password = ''
  }

  checkError() {
    const error = { username: '', password: '', message: '' }

    error.username = isNotEmpty(this.username)

    error.password = isNotEmpty(this.password)

    this.error = error
  }
}

export const loginFormStore = new LoginFormStore(authStore)
