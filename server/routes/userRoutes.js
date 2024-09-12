const router = require("express").Router();
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/google-login", UserController.googleLogin);
router.get("/user", authentication, UserController.getLoggedUser);

module.exports = router;
