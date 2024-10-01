import express from "express";
import { getProducts } from "../services/product.service";

const productRouter = express.Router();

productRouter.get("/getProducts", async (req, res) => {
 
  let products = await getProducts();

  res.status(200).json(products);
});

// productRouter.get("/", async (req, res) => {
//   let products: any[] = [];
//   let connection = getAxiosConnection();
//   do {
//     try {
//       const response = await connection.get(url);

//       let headersResponse = response.headers["link"];
//       const match = headersResponse.match(
//         /<[^>]+?&page_info=([^>]+?)>; rel="next"/
//       );

//       let pageInfo = match ? match[1] : null;
//       products.push(...response.data.products);

//       if (!pageInfo) {
//         break;
//       }

//       url = `/products.json?limit=50&page_info=${pageInfo}`;
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       next = false;
//     }
//   } while (next);

//   console.log(products.length);
//   res.status(200).json(new ProductResponse(products));
// });

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
