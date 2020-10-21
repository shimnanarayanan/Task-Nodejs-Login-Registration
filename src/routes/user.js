const express = require("express");
const router = new express.Router();
const { check } = require("express-validator");
const auth = require("../middlewares/auth");
const userController = require("../controllers/userController");


router
  .route("/")
   .post([
    check("name").not().isEmpty(),
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
  ], userController.createUser)
  .get(auth,userController.getUserData)

  
  
  
router
.route("/logins")
.get(auth,userController.getUserLogins)


  module.exports = router;
