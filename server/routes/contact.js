const express = require("express");
const router = express.Router();
const {getContacts, getContact, createContact, updateContact, deleteContact} = require("../controllers/contact");
const { auth } = require("../middleware/auth");

router.use(auth);

router.route("/").get(getContacts);

router.route("/").post(createContact);
 
router.route("/:id").get(getContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

module.exports = router
