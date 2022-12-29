const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const factoryRouter = require('./routes/factoryRouter');
const agencyRouter = require('./routes/agencyRouter');
const deliveryRouter = require('./routes/deliveryRouter');
const guaranteeRouter = require('./routes/guaranteeRouter');

app.use(cors());
app.use(express.json());

app.use('/user', userRouter); //Done
app.use('/product', productRouter); // Done
app.use('/factory', factoryRouter); //Done
app.use('/agency', agencyRouter);
app.use('/delivery', deliveryRouter);
app.use('/guarantee', guaranteeRouter);

const PORT = 5000;

try {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');
} catch (err) {
    console.log(err);
}

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
