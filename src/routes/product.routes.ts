import express from "express";
import { getProducts } from "../services/product.service";

const productRouter = express.Router();

/**
 * @swagger
 * /products/get-products:
 *   get:
 *     summary: Retrieve a list of products
 *     responses:
 *       200:
 *         description: A list of products
 *       204: 
 *         description: No results
 */
productRouter.get("/get-products", async (req, res) => {
 
  let products = await getProducts();

  if (products.length === 0) {
    res.status(204).send();
  }

  res.status(200).json(products);
});

export { productRouter };
