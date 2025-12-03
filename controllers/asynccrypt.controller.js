const { webcrypto: { subtle } } = require('crypto');

let keyPair = null;

const generateKeys = async () => {
  keyPair = await subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: { name: "SHA-256" }
    },
    true,
    ["encrypt", "decrypt"]
  );
};

const stringToBuffer = (str) => {
  const buf = new ArrayBuffer(str.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < str.length; i++) view[i] = str.charCodeAt(i);
  return buf;
};

const bufferToString = (buffer) => {
  const view = new Uint8Array(buffer);
  return Array.from(view).map(b => String.fromCodePoint(b)).join('');
};

const postRSAEncrypt = async (req, res) => {
  try {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: 'Data is required' });
    
    if (!keyPair) await generateKeys();
    
    const encrypted = await subtle.encrypt({ name: "RSA-OAEP" }, keyPair.publicKey, stringToBuffer(data));
    const result = Buffer.from(encrypted).toString('base64');
    
    return res.status(200).json({ encrypted: result });
  } catch (error) {
    return res.status(500).json({ error: 'Encryption failed', detail: error.message });
  }
};

const postRSADesencrypt = async (req, res) => {
  try {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: 'Data is required' });
    
    if (!keyPair) await generateKeys();
    
    const buffer = Buffer.from(data, 'base64');
    const decrypted = await subtle.decrypt({ name: "RSA-OAEP" }, keyPair.privateKey, buffer);
    const result = bufferToString(decrypted);
    
    return res.status(200).json({ decrypted: result });
  } catch (error) {
    return res.status(500).json({ error: 'Decryption failed', detail: error.message });
  }
};

module.exports = { 
    postRSAEncrypt, 
    postRSADesencrypt 
};
