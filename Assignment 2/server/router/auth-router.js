const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth-controller");

router.route("/register").post(controller.register);

router.route("/login").post(controller.login);

router.route("/get-users").get(controller.getUsers);

router.route("/delete-user").delete(controller.deleteUser);

module.exports = router;