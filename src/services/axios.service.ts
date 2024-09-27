import axios from "axios";
import 'dotenv/config'

export const getAxiosConnection = () => {
    const accessToken = process.env.SHOPIFY_ACCESS_TOKEN
    return axios.create({
      baseURL: ``,
      headers: {
        'X-Shopify-Access-Token': accessToken,
      },
    });
  }

