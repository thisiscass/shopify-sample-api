import { LineItem } from '../database/models/line-item';
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
        id: string;
        product_id: string | null;
    }[];
};

export const getOrders = async (): Promise<OrderResponse[]> => {
    const orders = await Order.findAll({
        include: [{
            model: LineItem,
            include: [Product]
        }] 
    });

    let ordersResponse: OrderResponse[] = [];
    
    if (orders) {
        ordersResponse = orders.map((order) => {
            const line_items = order.lineItems.map((lineItem) => ({
                product_id: lineItem.productId ? lineItem.product?.platformId.toString() : null
            }));
            
            return {
                id: order.id.toString(), 
                platform_id: order.platformId.toString(), 
                line_items: line_items, 
            };
        });
    }

    return ordersResponse;
};
export const fetchShopifyOrders = async () => {
    const ordersCount = await countResource(Resource.Orders, { status: 'any' });
    let limit = 50;
    if (ordersCount < 50) {
        limit = 1;
    }

    const orders = await fetchResource<ShopifyOrder>(Resource.Orders, { limit: limit, status: 'any' }, 500);

    let productsPlataformIdInTheOrders = orders
        .flatMap(o => o.line_items)
        .filter(li => li.product_id != null)
        .map(li => li.product_id);

    const productsIntheOrder = await Product.findAll({
        where: {
            platformId: productsPlataformIdInTheOrders.map(p => String(p))
        }
    });

    for (const order of orders) {
        const savedOrder = await Order.create({
            platformId: order.id
        });

        const lineItemsToBeSaved = order.line_items.map(li => {
            const matchedProduct = productsIntheOrder.find(p => p.platformId === String(li.product_id));

            return {
                platformId: String(li.id),
                productId: matchedProduct ? matchedProduct.id : null, 
                orderId: savedOrder.id 
            };
        });

        await LineItem.bulkCreate(lineItemsToBeSaved);
    }
};

