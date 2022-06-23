import { body, validationResult } from 'express-validator'

export class CreateItemsDTO {
  readonly email: string
  readonly username: string
  readonly description: string
}

export const CreateItemsValidator = [
  body('email').isEmail(),
  body('username').isLength({ min: 4, max: 255 }),
  body('description').isLength({ min: 1, max: 255 }),
]
