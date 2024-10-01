import express from 'express';
import { getOrders } from '../services/order.service';

const orderRouter = express.Router();

orderRouter.get('/', async (req, res) => {

  const orders = await getOrders();
  
  res.status(200).json(orders);

});

export { orderRouter };