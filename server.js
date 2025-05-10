require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
//, { useNewUrlParser: true }
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// const db = mongoose.connection;
// db.on('error', (error) => { console.error(error); })
// db.once('open', () => { console.log("connected to db"); })

app.use(express.json());


const productsRouter = require('./routes/products');
const registerRouter = require('./routes/registerRout');
const orderRouter = require('./routes/orderRout');
const loginRouter = require('./routes/loginRout');

app.use(cors());
app.use('/products', productsRouter);
app.use('/register', registerRouter);
app.use('/prevOrder', orderRouter);
app.use('/login', loginRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})