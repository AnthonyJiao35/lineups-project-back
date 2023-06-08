const express = require('express')
const app = express()
const port = 5555;
const mongoose = require('mongoose');
const db = require('./models/index');
const { UserController } = require('./controllers/userController');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

app.use('/assets', express.static('assets'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.mongoose.connect('mongodb://127.0.0.1:27017/test');

require('./routes/userRoute')(app);
require('./routes/lineupRoute')(app);
require('./routes/sideRoute')(app);
require('./routes/siteRoute')(app);

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Valorant LineUps API',
            version: '1.0.0',
            description: 'A simple Express API for Valorant LineUps',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{
            bearerAuth: [],
        }],
        servers: [
            {
                url: 'http://localhost:' + port,
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})