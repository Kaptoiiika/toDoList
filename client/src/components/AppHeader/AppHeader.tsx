import React from 'react'
import { observer } from 'mobx-react-lite'
import { authStore } from '../../store/AuthStore'
import { AuthForm } from '../forms/AuthForm'

type Props = {}

export const AppHeader = observer((props: Props) => {
  const isAuth = authStore.isAuth

  const hundleLogout = () => {
    authStore.logout()
  }
  return (
    <div className="AppHeader">
      {isAuth ? (
        <button className="AppHeader-logout" onClick={hundleLogout}>
          logout
        </button>
      ) : (
        <AuthForm />
      )}
    </div>
  )
})
