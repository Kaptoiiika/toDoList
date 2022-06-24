import {
  Button,
  Paper,
  Popover,
} from '@mui/material'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { loginFormStore } from '../../../store/UiStore/LoginFormStore'
import Input from '../../inputs/Input'
import './AuthForm.scss'

type Props = {}

export const AuthForm = observer((props: Props) => {
  const anchorEl = React.useRef(null)
  const loginOpen = loginFormStore.loginOpen
  const username = loginFormStore.username
  const password = loginFormStore.password
  const error = loginFormStore.error

  const hundleOpenMenu = () => {
    loginFormStore.setLoginOpen(true)
  }

  const hundleCloseMenu = () => {
    loginFormStore.setLoginOpen(false)
  }

  const hundleTryLogin = () => {
    loginFormStore.tryLogin()
  }

  return (
    <div className="authform">
      <Popover
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        anchorEl={anchorEl.current}
        open={loginOpen}
        onClose={hundleCloseMenu}
      >
        <Paper className="authform-form" elevation={3}>
          <form>
            <Input
              className="authform-form__inputs"
              onValueChange={(value) => loginFormStore.setUsername(value)}
              defaultValue={username}
              type="username"
              placeholder="username"
              error={!!error?.message}
              errorText={error?.username}
            />
            <Input
              className="authform-form__inputs"
              onValueChange={(value) => loginFormStore.setPassword(value)}
              defaultValue={password}
              type="password"
              placeholder="password"
              errorText={error?.message || error?.password}
            />
            <Button
              color="success"
              variant="contained"
              onClick={hundleTryLogin}
            >
              Sign IN
            </Button>
          </form>
        </Paper>
      </Popover>
      <Button
        ref={anchorEl}
        color="success"
        variant="contained"
        onClick={hundleOpenMenu}
      >
        Sign IN
      </Button>
    </div>
  )
})
