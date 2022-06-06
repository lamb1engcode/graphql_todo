const USER = require("../models/User");
const bcrypt = require("bcryptjs");
const jwtServices = require("./jwt.service");

const register = async (body) => {
  try {
    const { username, password } = body;

    const emailExist = await USER.findOne({
      username,
    });
    if (emailExist) {
      return {
        message: "Username already exist !!",
        success: false,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = new USER({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    const generateToken = jwtServices.createToken(newUser._id);
    return {
      message: "Successfully Register",
      success: true,
      data: {
        token: generateToken,
        user: newUser,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

const login = async (body) => {
  try {
    const {
      username,
      password
    } = body
    const user = await USER.findOne({
      username
    })
    if (!user) {
      return {
        message: 'Invalid username !!',
        success: false
      }
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return {
        message: 'Invalid password !!',
        success: false
      }
    }
    const generateToken = jwtServices.createToken(user._id)
    return {
      message: 'Successfully login',
      success: true,
      data: {
        token: generateToken,
      },
    };
  } catch (err) {
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

module.exports = {
  register,
  login,
};
