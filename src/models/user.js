const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var autoIncrement = require("mongoose-auto-increment");
const Schema = mongoose.Schema;
autoIncrement.initialize(mongoose.connection);

const userSchema = new Schema({
    uid: { type: Number },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tokens: [
        {
          token: { type: String },
        },
      ],
  
}, { timestamps: true });



userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  return token;
};

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({
  
    email: email,
  });
  if (!user) {
    throw new Error("Unable to login. User not registered.");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login. Invalid credentials.");
  }
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});



const User = mongoose.model("Users", userSchema);

module.exports = User;
