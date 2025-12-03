const express = require('express');
const router = express.Router();
const { postSHA256Hash, postArgon2Hash } = require('../controllers/crypto.controller');
const { postAESEncrypt, postAESDesencrypt } = require('../controllers/synccrypt.contoller'); 
const { postRSAEncrypt, postRSADesencrypt } = require('../controllers/asynccrypt.controller');

router.post('/encrypt/rsa', postRSAEncrypt);
router.post('/decrypt/rsa', postRSADesencrypt);

router.post('/encrypt/aes_cbc', postAESEncrypt);
router.post('/decrypt/aes_cbc', postAESDesencrypt);

router.post('/sha256', postSHA256Hash);
router.post('/argon2', postArgon2Hash);

module.exports = router;