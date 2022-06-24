import { AutherizationDTO } from '../dto/Autherization.dto'
import jwt from 'jsonwebtoken'

export class AuthService {
  async login(dto: AutherizationDTO):Promise<string | null> {
    const { username, password } = dto
    if (username === 'admin' && password === '123') {
      const token = jwt.sign({ admin: true }, 'haha', {
        expiresIn: '1d',
      })
      return token
    }
    return null
  }
}
