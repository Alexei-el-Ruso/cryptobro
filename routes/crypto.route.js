const express = require('express');
const router = express.Router();
const {
    hashSHA256,
    hashArgon2/*,
    symAES256CBC,
    symChaCha20,
    asymRSA_OAEP,
    asymDSA*/
} = require('../controllers/crypto.controller');

router.post('/hash/sha256', hashSHA256);

router.post('/hash/argon2', hashArgon2);
/*
router.post('/encrypt/aes256cbc', symAES256CBC);
router.post('/decrypt/aes256cbc', symAES256CBC);
*/
/*
router.post('/encrypt/chacha20', symChaCha20);
router.post('/decrypt/chacha20', symChaCha20);
*/
/*
router.post('/encrypt/rsa_oaep', asymRSA_OAEP);
router.post('/decrypt/rsa_oaep', asymRSA_OAEP);
*/
/*
router.post('/sign/', asymDSA);
router.post('/verify/', asymDSA);
*/

module.exports = router;