import { observer } from 'mobx-react-lite'
import React from 'react'
import './App.scss'
import { AppHeader } from './components/AppHeader/AppHeader'
import { ItemAddForm } from './components/forms/ItemAddForm'
import { ItemCard } from './components/cards/ItemCard'
import { itemStore } from './store/ItemsStore'

const App = observer(() => {
  const items = itemStore.items

  React.useEffect(() => {
    if (!items) itemStore.getItems()
  }, [])
  return (
    <div className="App">
      <AppHeader />
      TODO:
      <ItemAddForm />
      <div className="items">
        {items && items.map((item) => <ItemCard item={item} />)}
      </div>
    </div>
  )
})

export default App
