import { Order } from '../database/models/order';
import { Product } from '../database/models/product';
import { countResource, fetchResource, Resource } from './shopify.service';

type OrderResponse = {
    id: string;
    line_items:
    {
        product_id: string | null | undefined;
    }[];
}

type ShopifyOrder = {
    id: string;
    line_items:
    {
        id: number;
        product_id: string | null; 
    }[];
};

export const getOrders = async (): Promise<OrderResponse | any[]> => {
    const orders = await Order.findAll({
        include: [Product]
    });

    let ordersResponse: OrderResponse[] = [];
    if (orders) {
        ordersResponse = orders.map((order => {
            let line_items = order.lineItems.map(lineItem => { return { product_id: lineItem.productId ? lineItem.product?.platformId.toString() : null } })
            return {
                id: order.id.toString(),
                line_items: line_items,
                platform_id: order.platformId,
            }
        }))
    }

    return ordersResponse;
}

export const fecthShopifyOrders = async () => {
    const ordersCount = await countResource(Resource.Orders, { status: 'any' });
    let limit = 500;
    if (ordersCount < 50) {
        limit = 1;
    }

    const orders = await fetchResource<ShopifyOrder>(Resource.Orders, { limit: limit, status: 'any' }, 500);

    const ordersModel = orders.map(order => {
        return {
            platformId: order.id,
            lineItems: order.line_items.map(li => {
                return {
                    platformId: li.id,
                    productId: li.product_id
                }
            })
        }
    })

    Order.bulkCreate(ordersModel);
    
}