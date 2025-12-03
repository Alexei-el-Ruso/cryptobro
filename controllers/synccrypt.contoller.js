const crypto = require('crypto');

const ENC_KEY = "bf3c199c2470cb477d907b1e0917c17b"; 
const IV = "5183666c72eec9e4"; 

const postAESEncrypt = (req, res) => {
  try {
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({ error: 'Data is required' });
    }

    let cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV);
    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    
    return res.status(200).json({ encrypted });
  } catch (error) {
    console.error('Encryption error:', error);
    return res.status(500).json({ error: 'Encryption failed', detail: error.message });
  }
}

const postAESDesencrypt = (req, res) => {
  try {
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({ error: 'Data is required' });
    }

    let decipher = crypto.createDecipheriv('aes-256-cbc', ENC_KEY, IV);
    let decrypted = decipher.update(data, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    
    return res.status(200).json({ decrypted });
  } catch (error) {
    console.error('Decryption error:', error);
    return res.status(500).json({ error: 'Decryption failed', detail: error.message });
  }
}

module.exports = {
    postAESEncrypt,
    postAESDesencrypt,
}