import { ItemsService } from './items.service'
import express from 'express'
import { CreateItemsValidator } from '../dto/CreateItems.dto'
import { validationResult } from 'express-validator'
import { checkValidationError } from '../utils/checkValidationError'
import { UpdateItemsValidator } from '../dto/UpdateItems.dto'
import { authMiddleware } from '../utils/auth.middleware'

export class ItemsController {
  private itemsService: ItemsService
  constructor() {
    this.itemsService = new ItemsService()
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const filters = { order: [], page: undefined }
      const validOption = ['desc', 'asc']
      if (query.email && validOption.includes(query.email))
        filters.order.push(['email', query.email])

      if (query.username && validOption.includes(query.username))
        filters.order.push(['username', query.username])

      if (query.status && validOption.includes(query.status))
        filters.order.push(['status', query.status])

      const page = Number(query.page)
      if (page > 0) {
        filters.page = page - 1
      }

      const data = await this.itemsService.getAllItem(filters)
      res.json(data)
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  async createOne(req, res, next) {
    try {
      const { email, username, description } = req.body
      const data = await this.itemsService.createOne({
        email,
        username,
        description,
      })
      res.json(data)
    } catch (error) {
      res.status(500).json({})
    }
  }

  async updateOne(req, res, next) {
    try {
      const { email, username, description, status } = req.body
      const { id } = req.params
      const data = await this.itemsService.updateOne(id, {
        email,
        username,
        description,
        status,
      })
      if (data[0] === 0) return res.status(404).json({})
      res.json(data)
    } catch (error) {
      res.status(500).json({})
    }
  }
}

export const itemsRouter = express.Router()

const itemsController = new ItemsController()
itemsRouter.get('/items', itemsController.getAll.bind(itemsController))
itemsRouter.post(
  '/items',
  ...CreateItemsValidator,
  checkValidationError,
  itemsController.createOne.bind(itemsController)
)

itemsRouter.put(
  '/items/:id',
  authMiddleware,
  ...UpdateItemsValidator,
  checkValidationError,
  itemsController.updateOne.bind(itemsController)
)
