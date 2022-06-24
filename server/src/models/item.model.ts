import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database/database'

export const Items = sequelize.define('Items', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  email: {
    type: DataTypes.STRING,
  },

  description: {
    type: DataTypes.STRING,
  },

  username: {
    type: DataTypes.STRING,
  },

  status: {
    type: DataTypes.INTEGER,
  },
})
