const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI,)
  .then(() => console.log("Order Service: MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/order", (req, res) => {
  res.json({ message: "Order Service is Running" });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});
