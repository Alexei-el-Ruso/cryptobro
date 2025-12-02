const crypto = require('crypto');

const postSHA256Hash =  (req, res) => {
  try {
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({ error: 'Data is required' });
    }
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    return res.status(200).json({ hash });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }

};

const postArgon2Hash = (req, res) => {
  try {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: 'Data is required' });

    const parameters = {
      message: Buffer.from(String(data)),
      nonce: crypto.randomBytes(16),
      parallelism: 2,       
      tagLength: 64,        
      memory: 2 ** 16,      
      passes: 5,            
    };

    
    crypto.argon2('argon2d', parameters, (err, result) => {
      if (err) {
        console.error('Argon2 error:', err);
        return res.status(500).json({ error: 'Hashing error', detail: err.message });
      }
      return res.status(200).json({ hash: result.toString('hex') });
    });

  } catch (error) {
      console.error("Internal catch:", error);
      return res.status(500).json({ 
      error: 'Internal Server Error',
      detail: error.message
  });
}
};

const ENC_KEY = "bf3c199c2470cb477d907b1e0917c17b"; // 32 bytes in hex
const IV = "5183666c72eec9e4"; // 16 bytes in hex

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
    postSHA256Hash,
    postArgon2Hash,
    postAESEncrypt,
    postAESDesencrypt
}



