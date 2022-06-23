import { makeAutoObservable } from 'mobx'
import { CreateItemDTO } from '../dto/CreateItem.dto'
import { LoginDTO } from '../dto/Login.dto'
import { Item } from '../models/Item.model'
import { apiClient } from '../service/ApiClient'

export class ItemStore {
  items: Item[] | undefined

  constructor() {
    makeAutoObservable(this)
  }

  async getItems() {
    const { data } = await apiClient.get('/items')
    this.items = data.rows
    return data
  }

  async createItem(item: CreateItemDTO) {
    const data = await apiClient.post('/items', item)
    this.getItems()
    return data
  }
}

export const itemStore = new ItemStore()
