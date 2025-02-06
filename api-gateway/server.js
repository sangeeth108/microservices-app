const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.use("/user", createProxyMiddleware({ target: "http://localhost:5001", changeOrigin: true }));
app.use("/order", createProxyMiddleware({ target: "http://localhost:5002", changeOrigin: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
