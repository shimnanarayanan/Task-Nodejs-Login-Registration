const User = require("../models/user");

exports.userLogin = async (req, res, next) => {
  console.log("Body: ", req.body);
  let user
  try {
    user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Unable to login. Invalid credentials",
    });
  }


  try {
    const token = await user.generateAuthToken();
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Logged in",
      data: {
        token: token,
        userId: user._id,
        user: user
      }
    });
  } catch (error) {
    return res.status(400).json({
        success: false,
        message: "Error",
      
      });
  
  }
};





