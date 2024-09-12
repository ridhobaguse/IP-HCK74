const { User } = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const { Op } = require("sequelize");

const client = new OAuth2Client();

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ email: email }, { username: username }],
        },
      });

      if (existingUser) {
        if (existingUser.email === email) {
          return res
            .status(400)
            .json({ message: "Email is already registered." });
        }
        if (existingUser.username === username) {
          return res
            .status(400)
            .json({ message: "Username is already taken." });
        }
      }
      const newUser = await User.create({
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
      const { google_token } = req.headers;
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      const user = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: "Yuben ganteng",
        },
        hooks: false, // Disable hooks
      });

      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
  // controller buat ambil siapa user yang lagi login
  static async getLoggedUser(req, res, next) {
    try {
      console.log("Xxxxxx", req.user);

      const user = req.user;
      if (!user) {
        return res.status(400).json({ message: "User not authenticated" });
      }
      res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      next(error);
    }
  }
}

module.exports = UserController;
