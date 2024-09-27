import axios from "axios";
import express from "express";
import { AxiosServices } from "../services/axios.service";

const productRouter = express.Router();
let next = true;

productRouter.get("/", async (req, res) => {
  let products: any[] = [];
  let connection = new AxiosServices().getAxiosConnection();
  let url = `/products.json?limit=50`;
  do {
    try {
      const response = await connection.get(url);

      let headersResponse = response.headers["link"];
      const match = headersResponse.match(
        /<[^>]+?&page_info=([^>]+?)>; rel="next"/
      );

      let pageInfo = match ? match[1] : null;
      products.push(...response.data.products);

      console.log(`URL: ${url} `);
      console.log(`match: ${match} - Count: ${products.length}`);

      if (!pageInfo) {
        break;
      }

      url = `/products.json?limit=50&page_info=${pageInfo}`;
    } catch (error) {
      console.error("Error fetching products:", error);
      next = false;
    }
  } while (next);

  console.log(products.length);
  res.status(200).json(new ProductResponse(products));
});

export { productRouter };

type Product = {
  id?: string; // A unique ID for this product
  platform_id: string; // The Shopify ID of the product - id field
  name: string; // The Shopify name of the product - title
};

class ProductResponse {
  public products?: Product[];
  constructor(products: any[]) {
    this.products = products.map((product) => {
      return {
        platform_id: product.id,
        name: product.title,
      };
    });
  }
}
