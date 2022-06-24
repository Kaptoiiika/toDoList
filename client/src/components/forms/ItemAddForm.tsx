import { observer } from 'mobx-react-lite'
import React from 'react'
import { itemStore } from '../../store/ItemsStore'
import { itemCreateFormStore } from '../../store/UiStore/ItemCreateFromStore'
import Input from '../inputs/Input'

type Props = {}

export const ItemAddForm = observer((props: Props) => {
  const newItem = itemCreateFormStore.item
  const error = itemCreateFormStore.error

  const hundleAddTodo = () => {
    itemCreateFormStore.tryCreateItem()
  }

  return (
    <div className="itemform">
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Input
          onValueChange={(string) => itemCreateFormStore.setEmail(string)}
          defaultValue={newItem.email}
          placeholder="email"
          type="email"
          error={error?.email}
        />
        <Input
          onValueChange={(string) => itemCreateFormStore.setUsername(string)}
          defaultValue={newItem.username}
          placeholder="username"
          type="username"
          error={error?.username}
        />
        <Input
          onValueChange={(string) => itemCreateFormStore.setDescription(string)}
          defaultValue={newItem.description}
          placeholder="text"
          type="text"
          error={error?.description}
        />

        <button onClick={hundleAddTodo}>add todo</button>
      </form>
    </div>
  )
})
