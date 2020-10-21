const express = require("express");
const router = new express.Router();
const authController = require("../controllers/authController");
// const auth = require("../middleware/auth");

router
    .route("/login")
    .post(authController.userLogin);



module.exports = router;
