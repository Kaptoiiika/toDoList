import { FindOptions } from 'sequelize/types'
import { CreateItemsDTO } from '../dto/CreateItems.dto'
import { UpdateItemsDTO } from '../dto/UpdateItems.dto'
import { Items } from '../models/item.model'

export class ItemsService {
  itemsRepository: typeof Items
  constructor() {
    this.itemsRepository = Items
  }

  async getAllItem(filters: any) {
    const { order, limit = 3, page = 0 } = filters
    const items = await Items.findAndCountAll({
      order: order,
      limit: limit,
      offset: limit * page,
    })
    return items
  }

  async createOne(dto: CreateItemsDTO) {
    const { email, username, description } = dto
    const item = await this.itemsRepository.create({
      email,
      username,
      description,
    })
    await item.save()
    return item
  }

  async updateOne(id: string, dto: UpdateItemsDTO) {
    const { email, username, description, status } = dto
    const items = await this.itemsRepository.update(
      {
        email,
        username,
        description,
        status,
      },
      { where: { id: id } }
    )
    return items
  }
}
