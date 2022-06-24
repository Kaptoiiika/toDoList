import { observer } from 'mobx-react-lite'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.scss'
import { AppFooter } from './components/AppFooter/AppFooter'
import { AppHeader } from './components/AppHeader/AppHeader'
import useRoutes from './router'

const App = observer(() => {
  const routes = useRoutes()

  return (
    <div className="App">
      <BrowserRouter>
        <AppHeader />
        {routes}
        <AppFooter />
      </BrowserRouter>
    </div>
  )
})

export default App
