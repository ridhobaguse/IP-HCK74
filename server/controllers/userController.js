const { User } = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      let newUser = await User.create({
        username,
        email,
        password,
      });

      res.status(201).json({
        username: newUser.username,
        email: newUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "invalidUser" };
      if (!password) throw { name: "invalidUser" };

      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw { name: "notFound" };
      }

      const isValid = comparePassword(password, user.password);
      if (!isValid) throw { name: "invalidUser" };

      const access_token = signToken({
        id: user.id,
      });
      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);

      next(error);
    }
  }
  static async googleLogin(req, res, next) {
    try {
      res.status(200).json({ message: "Login Success" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
