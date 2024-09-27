import { Sequelize } from "sequelize-typescript";
import { config } from './config/database'

export default new Sequelize(config) 