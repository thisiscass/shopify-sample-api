import cors from 'cors';
import express from 'express';
import { productRouter } from './routes/product.routes';
import { orderRouter } from './routes/order.routes';
import sequelize from './database/index';
import 'dotenv/config';
import { fecthShopifyOrders } from './services/order.service';
import { fecthShopifyProducts } from './services/product.service';

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/products', productRouter);
app.use('/orders', orderRouter);

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Server is up and running' });
})

const start = async (): Promise<void> => {
    try {
        await sequelize.sync();

        await fecthShopifyProducts();
        // await fecthShopifyOrders();

        app.listen(port, () => {
            console.log(`App listening on port: ${port}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

}

void start();