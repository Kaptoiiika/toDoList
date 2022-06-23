import { Item } from '../models/Item.model'

export type CreateItemDTO = Omit<Item, 'id'>
