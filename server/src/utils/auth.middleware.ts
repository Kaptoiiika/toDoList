import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({})
    }
    const decoded = jwt.verify(token, 'haha')
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
