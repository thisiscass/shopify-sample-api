import { Product } from '../database/models/product';
import { fetchResource, Resource } from './shopify.service';

type ShopifyProduct = {
    id: number,
    title: string,
}

type ProductResponse = {
    id?: string;
    platform_id: string;
    name: string;
}

export const getProducts = async (): Promise<ProductResponse | any[]> => {
    const products = await Product.findAll();

    let productsResponse: ProductResponse[] = [];
    if (products) {
        productsResponse = products.map((product => {
            return {
                id: product.id.toString(),
                platform_id: product.platformId.toString(),
                name: product.name,
            }
        }))
    }

    return productsResponse;
}

export const fetchShopifyProducts = async () => {
    const products = await fetchResource<ShopifyProduct>(Resource.Product, { limit: 50 }, Number.MAX_VALUE);

    if (products) {
        let productsModel = products.map((product => {
            return {
                name: product.title,
                platformId: product.id,
            }
        }))

        await Product.bulkCreate(productsModel);
    }
}