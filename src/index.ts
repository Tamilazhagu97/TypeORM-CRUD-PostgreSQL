import express = require('express');
import {AppDataSource} from './data-source'
import bodyPaser = require('body-parser');
import userCustomerRouter from './router/userCustomerRoute'
const app = express();
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({extended: true}));
app.use('/api', userCustomerRouter);

const port = 6000;
AppDataSource.initialize().then(() => {
    console.log('Database connected successfully');
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
})
.catch((error) => {
    console.error('Database connection failed:', error);
});