import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('todo', 'postgres', '123456', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
})
