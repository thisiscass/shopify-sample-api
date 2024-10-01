import { SequelizeOptions } from 'sequelize-typescript'
import { Product } from '../models/product';
import { Order } from '../models/order';
import 'dotenv/config'
import { LineItem } from '../models/line-item';

const config: SequelizeOptions = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: 'postgres',
  models: [Product, Order, LineItem],
  logging: false
};

export { config };
