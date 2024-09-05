const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.get("/favorites/:username", profileController.getFavorites);
router.post("/favorites", profileController.addFavorite);
router.put("/favorites", profileController.updateFavorite);
router.delete("/favorites", profileController.deleteFavorite);

module.exports = router;
