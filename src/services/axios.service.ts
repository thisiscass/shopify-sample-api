import axios from "axios";

export class AxiosServices {
  private readonly apiVersion = "2022-04";
  getAxiosConnection() {
    return axios.create({
      baseURL: `https://rutterinterview.myshopify.com/admin/api/${this.apiVersion}`,
      headers: {
        "X-Shopify-Access-Token": "shpua_b1c9a97a8a3a33ee4a1aa0600b160cab",
      },
    });
  }
}
