const express = require("express");
const { createFAQ, getAllFAQs } = require("../Controller/faqController.js");

const router = express.Router();

router.post("/createfaq", createFAQ);
router.get("/getfaq", getAllFAQs);


module.exports = router;
