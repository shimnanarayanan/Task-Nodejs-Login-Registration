const { validationResult } = require("express-validator");
const User = require("../models/user");

exports.createUser=async (req,res) => {
    console.log("Body: ", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
   
    }

    const { name, email, password} = req.body;

    let _user;
    try {
      _user = await User.findOne({ 
        email: email  
      });
    } catch {
        return res.status(200).json({
            status:"false",
             message:"Error getting user data"
        })
    }

    if(_user){
       return res.status(401).json({
            success: false,
            message: "email already registerd",
           
          });
    }

    const newUser = new User({
        name,
        email,
        password
       
      });
    
      try {
        await newUser.save();
        res.status(201).json({
          success: true,
          message: "user created",
         
        });
      } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error creatng user",
          
          });
      }
}

exports.getUserData = async (req, res, next) => {
    let user
    try {
      user = await User.findById(req.user._id)
       return res.status(200).json({
        success: true,
        message: 'User profile details',
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
         
        }
      })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error fetchong user details',
           
          })
    }
  }

  
exports.getUserLogins = async (req, res, next) => {
  let user
  try {
    user = await User.findById(req.user._id)
     return res.status(200).json({
      success: true,
      message: 'User Login details',
      data: {
         userId:user._id,
         name:user.name,
        tokens: user.tokens,
        time:user.createdAt
       
      }
    })
  } catch (error) {
      return res.status(400).json({
          success: false,
          message: 'Error fetchong user details',
         
        })
  }
}

