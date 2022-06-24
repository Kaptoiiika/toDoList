import express from 'express'
import { authMiddleware } from '../utils/auth.middleware'
import { AutherizationValidator } from '../dto/Autherization.dto'
import { checkValidationError } from '../utils/checkValidationError'
import { AuthService } from './auth.service'

export const authRouter = express.Router()

export class AuthController {
  private authService: AuthService
  constructor() {
    this.authService = new AuthService()
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body
      const data = await this.authService.login({ username, password })
      if (data) {
        return res.json(data)
      }
      return res
        .status(401)
        .json({ message: 'incorectrd password or username' })
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  async auth(req, res, next) {
    return res.json({})
  }
}

const authController = new AuthController()
authRouter.post(
  '/login',
  ...AutherizationValidator,
  checkValidationError,
  authController.login.bind(authController)
)

authRouter.get(
  '/auth',
  authMiddleware,
  authController.auth.bind(authController)
)
