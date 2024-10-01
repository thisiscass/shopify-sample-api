import { getAxiosConnection } from "./axios.service";
import { NextLinkPattern } from "./contants";

export enum Resource {
    Orders = 'orders',
    Product = 'products'
};

interface ApiResponse<T> {
    [key: string]: T[]; // This allows indexing with string keys
}

export const fetchResource = async <T>(resource: Resource, queryParams?: any, totalLimit: number = 1): Promise<Array<T>> => {
    let connection = getAxiosConnection();
    let data: T[] = [];
    let url = `${resource}.json`;
    let next = true;
    let params = queryParams;

    do {
        try {
            const response = await connection.get<ApiResponse<T>>(url, { params: params });

            let headersResponse = response.headers["link"];
            const match = headersResponse.match(NextLinkPattern);

            let pageInfo = match ? match[1] : null;
            data.push(...response.data[resource]);

            if (!pageInfo) {
                break;
            }

            if(params['page_info']) {
                params = { ...params, page_info: pageInfo };
            }

            if(params['status']) {
                const { status, ...newParams } = params;
                params = newParams;
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            next = false;
        }
    } while (next && data.length <= totalLimit);

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