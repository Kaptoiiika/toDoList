import { makeAutoObservable, reaction } from 'mobx'
import { CreateItemDTO } from '../../dto/CreateItem.dto'
import { parseBackendError } from '../../utils/parseBackendError'
import { isEmail, isNotEmpty } from '../../utils/validator'
import { itemStore, ItemStore } from '../ItemsStore'

export class ItemCreateFormStore {
  item: CreateItemDTO = {
    email: '',
    username: '',
    description: '',
  }
  counter = 0
  error = {
    ...this.item,
    message: '',
  }

  constructor(private itemStore: ItemStore) {
    makeAutoObservable(this)
    reaction(
      () => [this.item.email, this.item.username, this.item.description],
      () => {
        if (this.counter) this.checkError()
      }
    )
  }

  setEmail(email: string) {
    this.item.email = email
  }

  setUsername(username: string) {
    this.item.username = username
  }

  setDescription(description: string) {
    this.item.description = description
  }

  async tryCreateItem() {
    this.counter++
    this.checkError()
    if (this.error?.email || this.error?.username || this.error?.description)
      return
    try {
      await this.itemStore.createItem(this.item)
      this.clearForm()
    } catch (error) {
      this.error = parseBackendError(error)
    }
  }

  clearForm() {
    this.item = {
      email: '',
      username: '',
      description: '',
    }
    this.counter = 0
  }

  checkError() {
    const error = { username: '', email: '', description: '', message: '' }

    error.email = isEmail(this.item.email)
    error.username = isNotEmpty(this.item.username)
    error.description = isNotEmpty(this.item.description)

    this.error = error
  }
}

export const itemCreateFormStore = new ItemCreateFormStore(itemStore)
