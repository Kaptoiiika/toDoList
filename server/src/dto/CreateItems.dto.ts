import { body, validationResult } from 'express-validator'

export class CreateItemsDTO {
  readonly email: string
  readonly username: string
  readonly description: string
}

export const CreateItemsValidator = [
  body('email').isEmail(),
  body('username').isLength({ min: 4, max: 255 }).withMessage('minimum 4 char'),
  body('description').isLength({ min: 1, max: 255 }),
]
