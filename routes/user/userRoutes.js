const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const controller = require("../../controllers/userControllers")

router.post("/registration", jsonParser, controller.register)
router.post("/login", jsonParser, controller.login)

module.exports = router;