require("dotenv").config;
const { userModel } = require("../models/user");
const asyncHandler = require("../utils/asyncHandler");

class userController {
  constructor() {
    this.register = asyncHandler(this.register.bind(this));
  }

  async register(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const existingUser = await userModel.findOne({ email })
    console.log('existingxdxdUser', existingUser)
    if (existingUser ) {
      return res.status(400).json({ message: 'User  already exists' });
    }
    const newUser  = new userModel({
      email,
      password,
    });
    await newUser.save();
    
    res.status(201).json({ message: 'User  registered successfully' });
  }

}

module.exports = new userController();

// try {
//   const { email, password } = req.body;

//   let schema;

//   const isValid = await schema.validate(req.body);
//   if (!isValid) {
//     const errors = schema.validateSync(req.body, { abortEarly: false })
//       .error.details;
//     const errorMessages = errors.map((error) => error.message);
//     return sendErrorResponse({
//       status: 400,
//       res,
//       message: errorMessages.join(", "),
//     });
//   }
//   const existingUserByEmail = await userModel.findOne({ email: email });

//   if(existingUserByEmail){
//     sendErrorResponse({
//       status: 403,
//       res,
//       message: "email is already exist.",
//     });
//   }
// } catch (error) {
//   console.error(error);
//   sendErrorResponse({
//     status: 500,
//     res,
//     error: error.message,
//     message: "Internal Server Error",
//   });
// }
