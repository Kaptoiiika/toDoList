import { makeAutoObservable } from 'mobx'
import { validOption } from '../dto/ValidOption.dto'

class QueryStore {
  limit = 3
  page = 1
  email: validOption
  username: validOption
  status: validOption
  constructor() {
    makeAutoObservable(this)
    const params = new URLSearchParams(window.location.search)
    this.page = Number(params.get('page')) || 1
    this.email = params.get('email') || undefined
    this.username = params.get('username') || undefined
    this.status = params.get('status') || undefined
  }

  setPage(value: number) {
    this.page = value
  }
  setEmailFilter() {
    this.email = this.setOption(this.email)
  }

  setUsernameFilter() {
    this.username = this.setOption(this.username)
  }

  setStatusFilter() {
    this.status = this.setOption(this.status)
  }

  private setOption(value: validOption) {
    switch (value) {
      case 'desc':
        return 'asc'
      case 'asc':
        return undefined
      default:
        return 'desc'
    }
  }
}

export const queryStore = new QueryStore()
