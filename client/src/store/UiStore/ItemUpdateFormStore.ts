import { makeAutoObservable, reaction } from 'mobx'
import { Item } from '../../models/Item.model'
import { parseBackendError } from '../../utils/parseBackendError'
import { isEmail, isNotEmpty } from '../../utils/validator'
import { ItemStore, itemStore } from '../ItemsStore'

class ItemUpdateFormStore {
  item: Item | undefined
  error: any
  constructor(private itemStore: ItemStore) {
    makeAutoObservable(this)
    reaction(
      () => [this.item?.email, this.item?.username, this.item?.description],
      () => {
        this.checkError()
      }
    )
  }

  setItem(item: Item) {
    this.item = item
  }

  setEmail(email: string) {
    if (this.item) this.item.email = email
  }

  setUsername(username: string) {
    if (this.item) this.item.username = username
  }

  setDescription(description: string) {
    if (this.item) this.item.description = description
  }

  setStatus(status: number) {
    if (this.item) this.item.status = status
  }

  async saveItem() {
    if (!this.item) return
    try {
      await this.itemStore.updateItem(this.item)
      this.clearForm()
    } catch (error) {
      this.error = parseBackendError(error)
    }
  }

  checkError() {
    const error = { username: '', email: '', description: '', message: '' }

    error.email = isEmail(this.item?.email)
    error.username = isNotEmpty(this.item?.username)
    error.description = isNotEmpty(this.item?.description)

    this.error = error
  }

  clearForm() {
    this.error = undefined
    this.item = undefined
  }
}

export const itemUpdateFormStore = new ItemUpdateFormStore(itemStore)
