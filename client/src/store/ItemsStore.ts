import { makeAutoObservable } from 'mobx'
import { LoginDTO } from '../dto/Login.dto'
import { Item } from '../models/Item.model'
import { apiClient } from '../service/ApiClient'

export class AuthStore {
  items: Item | undefined

  constructor() {
    makeAutoObservable(this)
  }

  async getItems(dto: LoginDTO) {
    const { data } = await apiClient.get('/items')
  }
}
