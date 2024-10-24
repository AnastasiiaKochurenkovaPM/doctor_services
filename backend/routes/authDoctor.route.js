const express = require("express")
const {register, login, logout} = require("../controllers/auth.controller.js")
const verifyToken = require('../middlewares/jwt.js');

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get('/check', verifyToken, (req, res) => {
    res.status(200).json({ loggedIn: true, userId: req.userId });
  });

module.exports = router;