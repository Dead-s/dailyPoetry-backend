const express = require("express");
const router = express.Router();
const socialController = require("../controllers/socialController");

router.route("/").get(socialController.getSocials).post(socialController.addSocials);

module.exports = router;
