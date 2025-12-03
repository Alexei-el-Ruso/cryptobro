const express = require('express');
const router = express.Router();
const { SHA256Hash, Argon2Hash } = require('../controllers/crypto.controller');
const { AESEncrypt, AESDesencrypt, symChaCha20en, symChaCha20de } = require('../controllers/synccrypt.contoller');
const { RSAEncrypt, RSADesencrypt, asymDSAsi, asymDSAve } = require('../controllers/asynccrypt.controller');

router.post('/hash/sha256', SHA256Hash);

router.post('/hash/argon2', Argon2Hash);

router.post('/encrypt/aes_cbc', AESEncrypt);
router.post('/decrypt/aes_cbc', AESDesencrypt);

router.post('/encrypt/chacha20', symChaCha20en);
router.post('aes_', symChaCha20de);

router.post('/sign/dsa', asymDSAsi);
router.post('/verify/dsa', asymDSAve);

router.post('/encrypt/rsa', RSAEncrypt);
router.post('/decrypt/rsa', RSADesencrypt);

module.exports = router;