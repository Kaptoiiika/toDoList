import bodyParser from 'body-parser'
import express from 'express'
import { authRouter } from './auth/auth.controller'
import { sequelize } from './database/database'
import { itemsRouter } from './items/items.controller'

const app = express()
app.use(bodyParser.json())

const PORT = 4030

app.use(itemsRouter)
app.use(authRouter)

async function start() {
  try {
    await sequelize.authenticate()
    // await sequelize.sync({ force: true })
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}...`)
    })
  } catch (error) {
    console.log('server error', error.message)
    process.exit(1)
  }
}

start()
