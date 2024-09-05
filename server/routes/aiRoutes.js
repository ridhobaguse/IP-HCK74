const router = require("express").Router();
const AiController = require("../controllers/ai");

router.post("/gemini-ai", AiController.geminiAi);

module.exports = router;
