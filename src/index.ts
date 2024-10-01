import cors from 'cors';
import express from 'express';
import { productRouter } from './routes/product.routes';
import { orderRouter } from './routes/order.routes';
import sequelize from './database/index';
import 'dotenv/config';
import { fetchShopifyOrders } from './services/order.service';
import { fetchShopifyProducts } from './services/product.service';

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/getProducts', productRouter);
app.use('/getOrders', orderRouter);

(async () => {
    try {
        await sequelize.sync({ logging: false });

        await fetchShopifyProducts(); 
        await fetchShopifyOrders();  

        console.log('Shopify data successfully fetched.')
    } catch (error) {
        console.error("Error during fetching:", error);
    }
})();

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Server is up and running' });
})

const start = async (): Promise<void> => {
    try {
        app.listen(port, () => {
            console.log(`App listening on port: ${port}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

}

void start();