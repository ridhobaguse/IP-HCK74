const router = require("express").Router();
const AgentController = require("../controllers/agentController");

router.get("/", AgentController.getAllAgent);

module.exports = router;
