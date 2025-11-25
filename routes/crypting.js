const express = require('express');
const router = express.Router();
const { makeSHA256 } = require("../controllers/cryptingontroller");

router.post('/api/hash/sha256', makeSHA256);


module.exports = router;
