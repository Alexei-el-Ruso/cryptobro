const crypto = require('crypto');

const hashSHA256 =  (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        if (!data) {
            return res.status(400).json({ error: 'Data is required' });
        }
        const hash = crypto.createHash('sha256').update(data["message"]).digest('hex');
        return res.status(200).json({ hash });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const hashArgon2 = (req, res) => {
    try {
    const data = req.body;
    if (!data) return res.status(400).json({ error: 'Data is required' });

    let loc_nonce;
    if (data.nonce) loc_nonce = data.nonce;
    else loc_nonce = crypto.randomBytes(16);

    let loc_parallelism;
    if (data.parallelism) loc_parallelism = data.parallelism;
    else loc_parallelism = 2;

    let loc_tagLength;
    if (data.tagLength) loc_tagLength = data.tagLength;
    else loc_tagLength = 64;

    let loc_memory;
    if (data.memory) loc_memory = data.memory;
    else loc_memory = 2 ** 16;

    let loc_passes;
    if (data.passes) loc_passes = data.passes;
    else loc_passes = 5;

    const parameters = {
        message: data.message,
        nonce: loc_nonce,
        parallelism: loc_parallelism,
        tagLength: loc_tagLength,
        memory: loc_memory,
        passes: loc_passes,
    };

    crypto.argon2('argon2d', parameters, (err, result) => {
        if (err) {
            console.error('Argon2 error:', err);
            return res.status(500).json({ error: 'Hashing error', detail: err.message });
        }
        return res.status(200).json({ hash: result.toString("hex") });
    });

<<<<<<< HEAD
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



=======
    } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    hashSHA256,
    hashArgon2
}
>>>>>>> 735bd7d42f4bee6e5ea4655f480382ac8507134f
