import { observer } from 'mobx-react-lite'
import React from 'react'
import { loginFormStore } from '../../store/UiStore/LoginFormStore'
import Input from '../inputs/Input'

type Props = {}

export const AuthForm = observer((props: Props) => {
  const loginOpen = loginFormStore.loginOpen
  const username = loginFormStore.username
  const password = loginFormStore.password
  const error = loginFormStore.error

  const hundleOpenMenu = () => {
    loginFormStore.setLoginOpen(true)
  }

  const hundleTryLogin = () => {
    loginFormStore.tryLogin()
  }

  return (
    <>
      {loginOpen ? (
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            onValueChange={(value) => loginFormStore.setUsername(value)}
            defaultValue={username}
            type="username"
            placeholder="username"
            error={error?.username}
          />
          <Input
            onValueChange={(value) => loginFormStore.setPassword(value)}
            defaultValue={password}
            type="password"
            placeholder="password"
            error={error?.message || error?.password}
          />
          <button className="AppHeader-login__open" onClick={hundleTryLogin}>
            Sign IN
          </button>
        </form>
      ) : (
        <button className="AppHeader-login__close" onClick={hundleOpenMenu}>
          Sign IN
        </button>
      )}
    </>
  )
})
