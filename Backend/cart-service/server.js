const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', cartRoutes);

mongoose.connect('mongodb://localhost:27017/cart-service')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.log('Error connecting to MongoDB', error.message);
});

const PORT = 5003;
app.listen(PORT, () => {
  console.log(`Cart Service running on port ${PORT}`);
});