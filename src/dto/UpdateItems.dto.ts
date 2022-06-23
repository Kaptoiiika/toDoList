import { body, validationResult, param } from 'express-validator'

export class UpdateItemsDTO {
  readonly email?: string
  readonly username?: string
  readonly description?: string
  readonly status?: number
}

export const UpdateItemsValidator = [
  param('id').isNumeric(),
  body('email').isEmail().optional(),
  body('username').isLength({ min: 4, max: 255 }).optional(),
  body('description').isLength({ min: 1, max: 255 }).optional(),
  body('status').isNumeric().optional(),
]
