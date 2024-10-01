import { getAxiosConnection } from "./axios.service";
import { NextLinkPattern } from "./contants";

export enum Resource {
    Orders = 'Orders',
    Product = 'Product'
};

export const fetchResource = async <T>(resource: Resource, queryParams?: any, condition: number = 0): Promise<Array<T>> => {
    let connection = getAxiosConnection();
    let data: T[] = [];
    let url = `${resource}.json`;
    let next = true;
    let params = queryParams;

    if(condition <= 0) {
        condition = 1;
    }

    do {
        try {
            const response = await connection.get(url, { params: params });

            let headersResponse = response.headers["link"];
            const match = headersResponse.match(NextLinkPattern);

            let pageInfo = match ? match[1] : null;
            data.push(...response.data[resource.toString().toLowerCase()]);

            if (!pageInfo) {
                break;
            }

            params = params['page_info'] ?? { ...params, page_info: pageInfo };
        } catch (error) {
            console.error("Error fetching products:", error);
            next = false;
        }
    } while (data.length === condition);

    return data;
}

export const countResource = async (resource: Resource, queryParams?: any): Promise<number> => {
    let connection = getAxiosConnection();
    let url = `${resource}/count.json`;
    let count = 0;
    let params = queryParams;

        try {
            const response = await connection.get(url, { params: params });

            count = response.data.count;

        } catch (error) {
            console.error("Error count products:", error);
        }

    return count;
}