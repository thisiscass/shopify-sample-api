import cors from 'cors';
import express from 'express';
import { productRouter } from './routes/product.routes';
import { orderRouter } from './routes/order.routes';
import sequelize from './database/index';
import { fetchShopifyOrders } from './services/order.service';
import { fetchShopifyProducts } from './services/product.service';
import { swaggerApp } from './doc/swagger';
import 'dotenv/config';

const isDocker = process.env.DOCKER_ENV === 'true';

if (isDocker) {
  console.log('Running inside Docker with environment variables from Docker.');
} else {
  console.log('Running outside Docker, environment variables may be from .env file.');
}

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/products', productRouter);
app.use('/orders', orderRouter);

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

swaggerApp(app);

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