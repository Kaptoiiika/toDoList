import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('postgres', 'postgres', '123456', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
})
