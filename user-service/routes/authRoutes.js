const express = require("express");
const { signup, signin } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", signup,(req, res) => {
  });
router.post("/signin", signin, (req, res) => {
  });

  router.get("/protected", authMiddleware, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
  });
  
  
module.exports = router;
