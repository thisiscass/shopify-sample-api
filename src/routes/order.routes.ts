import express from 'express';
import { getOrders } from '../services/order.service';

const orderRouter = express.Router();

/**
 * @swagger
 * /orders/get-orders:
 *   get:
 *     summary: Retrieve a list of orders with its list items
 *     responses:
 *       200:
 *         description: A list of orders
 *       204: 
 *         description: No results
 */
orderRouter.get('/get-orders', async (req, res) => {

  const orders = await getOrders();
  
  if (orders.length === 0) {
    res.status(204).send();
  }
  
  res.status(200).json(orders);

});

export { orderRouter };