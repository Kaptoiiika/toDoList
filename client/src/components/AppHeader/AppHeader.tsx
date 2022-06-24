import React from 'react'
import { observer } from 'mobx-react-lite'
import { authStore } from '../../store/AuthStore'
import { Toolbar, Typography, Button, AppBar } from '@mui/material'
import './AppHeader.scss'
import { AuthForm } from '../forms/AuthForm/AuthForm'

type Props = {}

export const AppHeader = observer((props: Props) => {
  const isAuth = authStore.isAuth

  const hundleLogout = () => {
    authStore.logout()
  }
  return (
    <div className="AppHeader">
      <AppBar position="static">
        <Toolbar>
          <div className="AppHeader-content">
            <Typography variant="h5" noWrap>
              Todo list
            </Typography>

            {isAuth ? (
              <Button
                color="success"
                variant="contained"
                className="AppHeader-logout"
                onClick={hundleLogout}
              >
                logout
              </Button>
            ) : (
              <AuthForm />
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
})
