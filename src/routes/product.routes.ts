import express from "express";
import { getProducts } from "../services/product.service";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
 
  let products = await getProducts();

  res.status(200).json(products);
});

export { productRouter };
