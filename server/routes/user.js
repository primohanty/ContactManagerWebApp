const express = require("express");
const router = express.Router();
const {userRegister, userLogin, currentUserInfo} = require("../controllers/user");
const { auth } = require("../middleware/auth");


router.post("/register", userRegister);

router.post("/login", userLogin);

router.get("/current", auth, currentUserInfo);

module.exports = router;
