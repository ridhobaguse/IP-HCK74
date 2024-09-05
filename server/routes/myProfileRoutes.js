const express = require("express");
const MyProfileController = require("../controllers/myProfileController");
const router = express.Router();

router.post("/myprofiles", MyProfileController.create);
router.get("/myprofiles", MyProfileController.getAll);
router.get("/myprofiles/:id", MyProfileController.getOne);
router.put("/myprofiles/:id", MyProfileController.update);
router.delete("/myprofiles/:id", MyProfileController.delete);

module.exports = router;
