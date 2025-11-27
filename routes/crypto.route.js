const express = require('express');
const router = express.Router();
const { postSHA256Hash, postArgon2Hash } = require('../controllers/crypto.controller');

router.post('/api/hash/sha256', postSHA256Hash);
router.post('/api/hash/argon2', postArgon2Hash);

module.exports = router;