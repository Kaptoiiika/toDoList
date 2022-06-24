import { Button } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { itemCreateFormStore } from '../../../store/UiStore/ItemCreateFormStore'
import Input from '../../inputs/Input'
import './ItemAddForm.scss'
type Props = {}

export const ItemAddForm = observer((props: Props) => {
  const newItem = itemCreateFormStore.item
  const error = itemCreateFormStore.error

  const hundleAddTodo = () => {
    itemCreateFormStore.tryCreateItem()
  }

  return (
    <div className="itemform">
      <div className="itemform-userinfo">

        <Input
          onValueChange={(string) => itemCreateFormStore.setEmail(string)}
          defaultValue={newItem.email}
          placeholder="email"
          type="email"
          errorText={error?.email}
        />
        <Input
          onValueChange={(string) => itemCreateFormStore.setUsername(string)}
          defaultValue={newItem.username}
          placeholder="username"
          type="username"
          errorText={error?.username}
        />
      </div>

      <Input
        onValueChange={(string) => itemCreateFormStore.setDescription(string)}
        defaultValue={newItem.description}
        placeholder="text"
        type="text"
        errorText={error?.description}
      />

      <Button variant="contained" onClick={hundleAddTodo}>
        add todo
      </Button>
    </div>
  )
})
