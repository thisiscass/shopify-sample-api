import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import 'dotenv/config'

const port = process.env.PORT || 3000;
const host = process.env.HOST;

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Mini Rutter API",
            version: "1.0.0",
            description: "This API fetches data from Shopify and transforms the data into a simpler format.", 
        },
        servers: [
            {
                url: `${host}:${port}`,
            },
        ],
    },
    apis: ["./src/routes/*.ts"], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const swaggerApp = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
