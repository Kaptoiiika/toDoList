import { reaction, makeAutoObservable } from 'mobx'
import { isNotEmpty } from '../../utils/validator'
import { authStore, AuthStore } from '../AuthStore'

type LoginFormError = { username: string; password: string }
class LoginFormStore {
  username: string | undefined
  password: string | undefined

  loginOpen = false
  error: LoginFormError | undefined

  constructor(private authStore: AuthStore) {
    makeAutoObservable(this)
    reaction(
      () => [this.username, this.password],
      () => this.checkError()
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

  checkError() {
    const error = { username: '', password: '' }

    error.username = isNotEmpty(this.username)

    error.password = isNotEmpty(this.password)

    this.error = error
  }
}

export const loginFormStore = new LoginFormStore(authStore)
