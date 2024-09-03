const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
  try {
    let access_token = req.headers.authorization;
    if (!access_token) throw { name: "InvalidToken" };
    let [bearer, token] = access_token.split(" ");
    if (bearer !== "Bearer") throw { name: "InvalidToken" };
    const payload = verifyToken(token);
    const user = await User.findByPk(payload.id);
    if (!user) throw { name: "InvalidToken" };
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
