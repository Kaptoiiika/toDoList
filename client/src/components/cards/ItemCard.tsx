import {
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Item } from '../../models/Item.model'
import { authStore } from '../../store/AuthStore'
import BuildIcon from '@mui/icons-material/Build'
import './itemCard.scss'
import Input from '../inputs/Input'
import { itemUpdateFormStore } from '../../store/UiStore/ItemUpdateFormStore'
import EditIcon from '@mui/icons-material/Edit'

type Props = {
  item: Item
}

export const ItemCard = observer((props: Props) => {
  const { item } = props

  const isAuth = authStore.isAuth
  const error = itemUpdateFormStore.error
  const editItem = itemUpdateFormStore.item
  const isEdited = item.createdAt !== item.updatedAt

  const hundleEdit = () => {
    itemUpdateFormStore.setItem(Object.assign({}, item))
  }

  const hundleCloseEdit = () => {
    itemUpdateFormStore.clearForm()
  }

  const hundleSave = async () => {
    await itemUpdateFormStore.saveItem()

  }

  if (editItem?.id === item.id) {
    return (
      <Card elevation={4} className="itemCard ">
        <CardContent>
          <div className="itemCard-edit">
            <Input
              onValueChange={(string) =>
                itemUpdateFormStore.setUsername(string)
              }
              placeholder="username"
              variant="standard"
              defaultValue={item.username}
              error={!!error?.message}
              errorText={error?.username}
            />
            <Input
              onValueChange={(string) => itemUpdateFormStore.setEmail(string)}
              placeholder="email"
              variant="standard"
              defaultValue={item.email}
              error={!!error?.message}
              errorText={error?.email}
            />
            <Input
              onValueChange={(string) =>
                itemUpdateFormStore.setDescription(string)
              }
              placeholder="description"
              variant="standard"
              defaultValue={item.description}
              error={!!error?.message}
              errorText={error?.description}
            />
            <Input
              onValueChange={(string) => itemUpdateFormStore.setStatus(Number(string))}
              type="number"
              placeholder="status"
              variant="standard"
              defaultValue={item.status}
              errorText={error?.message || error?.status}
            />
          </div>
          <div>
            <Button onClick={hundleSave}>save</Button>
            <Button onClick={hundleCloseEdit}>cancel</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card elevation={4} className="itemCard">
      <CardContent>
        {isEdited && (
          <div className="itemCard-edited">
            <Tooltip title="edited by admin">
              <EditIcon />
            </Tooltip>
          </div>
        )}
        {isAuth && (
          <div className="itemCard-editButton">
            <IconButton onClick={hundleEdit}>
              <BuildIcon />
            </IconButton>
          </div>
        )}
        <Typography variant="h5" component="div">
          {item.username}
        </Typography>
        <Typography color="text.secondary">{item.email}</Typography>
        <br />
        <Typography variant="body2">{item.description}</Typography>

        <Typography variant="body2">status:{item.status | 0}</Typography>
      </CardContent>
    </Card>
  )
})
