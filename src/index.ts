import cors from 'cors';
import express from 'express';
import 'dotenv/config';
import { productRouter } from './routes/product.routes';
import { orderRouter } from './routes/order.routes';

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use('/products', productRouter);
app.use('/orders', orderRouter);

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Server is up and running' });
})

app.listen(port, () => {
 console.log(`App listening on port: ${port}`);
});