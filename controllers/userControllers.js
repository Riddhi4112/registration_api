require("dotenv").config;
const { userModel } = require("../models/user");
const asyncHandler = require("../utils/asyncHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class userController {
  constructor() {
    this.register = asyncHandler(this.register.bind(this));
    this.login = asyncHandler(this.login.bind(this));
  }

  async register(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const existingUser = await userModel.findOne({ email });
    console.log("existingxdxdUser", existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "User  already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "User  registered successfully" });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const authtoken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({
      message: "User  logged in successfully", 
      authtoken
  });
    
  }
}

module.exports = new userController();
