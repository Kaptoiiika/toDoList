import { body, validationResult } from 'express-validator'

export class AutherizationDTO {
  readonly username: string
  readonly password: string
}

export const AutherizationValidator = [
  body('username').isString().isLength({ max: 255 }),
  body('password').isString().isLength({ max: 255 }),
]
