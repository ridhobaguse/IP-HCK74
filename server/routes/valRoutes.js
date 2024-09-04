const express = require("express");
const ValController = require("../controllers/valController");

const router = express.Router();

router.get("/agents", ValController.getAllAgent);
router.get("/maps", ValController.getAllMap);
router.get("/weapons", ValController.getAllWeapon);

module.exports = router;
