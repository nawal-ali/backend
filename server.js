require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
//, { useNewUrlParser: true }
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// const db = mongoose.connection;
// db.on('error', (error) => { console.error(error); })
// db.once('open', () => { console.log("connected to db"); })

app.use(express.json());


const productsRouter = require('./routes/products');
app.use('/products', productsRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})