import { makeAutoObservable } from 'mobx'
import { CreateItemDTO } from '../dto/CreateItem.dto'
import { Item } from '../models/Item.model'
import { apiClient } from '../service/ApiClient'

export class ItemStore {
  countAll = 0
  items: Item[] | undefined
  loading = false

  constructor() {
    makeAutoObservable(this)
  }

  async getItems() {
    if (this.loading) return
    this.loading = true
    const params = new URLSearchParams(document.location.search)

    const { data } = await apiClient.get('/items', { params })
    this.items = data.rows
    this.countAll = data.count
    this.loading = false

    return data
  }

  async createItem(item: CreateItemDTO) {
    const data = await apiClient.post('/items', item)
    this.getItems()
    return data
  }

  async updateItem(item: Item) {
    const data = await apiClient.put(`/items/${item.id}`, item)
    this.getItems()
    return data
  }
}

export const itemStore = new ItemStore()
