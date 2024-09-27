import express from "express";
import { AxiosServices } from "../services/axios.service";

const orderRouter = express.Router();

const url = `/orders.json?status=any&limit=250`;

orderRouter.get("/", async (req, res) => {
  let connection = new AxiosServices().getAxiosConnection();
  
  try {
    const response = await connection.get(url);
    
    res.status(200).json(new OrderResponse(response.data.orders));

  } catch (error) {
    console.error("Error fetching orders:", error);
  }  
});

export { orderRouter };

type Order = {
  // id: string; // A unique ID for this order
  platform_id: string; // The Shopify ID of the order
  line_items: [
    {
      product_id: string | null; // An ID referencing the unique ID you used to store Shopify products. If the product does not exist in your database, return null
    }
  ];
};

class OrderResponse {
  public orders?: Order[];
  constructor(orders: any[]) {
    this.orders = orders.map((o) => {
      return {
        platform_id: o.id,
        line_items: o.line_items.map((li: any) => {
          return {
            product_id: li.product_id,
          };
        }),
      };
    });
  }
}
