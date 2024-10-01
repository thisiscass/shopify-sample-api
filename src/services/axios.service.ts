import axios from "axios";
import 'dotenv/config'

export const getAxiosConnection = () => {
    const accessToken = process.env.SHOPIFY_ACCESS_TOKEN
    return axios.create({
      baseURL: `https://rutterinterview.myshopify.com/admin/api/2022-04`,
      headers: {
        'X-Shopify-Access-Token': accessToken,
      },
    });
  }

