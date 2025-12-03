const crypto = require('crypto');

const ENC_KEY = "bf3c199c2470cb477d907b1e0917c17b"; 
const IV = "5183666c72eec9e4"; 

const AESEncrypt = (req, res) => {
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

const AESDesencrypt = (req, res) => {
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

let datasetChaCha20 = [];

const symChaCha20en = (req, res) => {
    try {
        const data = req.body;
        if (!data) return res.status(400).json({ error: 'Data is required' });

        let loc_key;
        if (data.key) loc_key = Buffer.from(data.key, "hex");
        else return res.status(400).json({ error: 'Key is required' });

        let loc_nonce;
        if (data.nonce) loc_nonce = data.nonce;
        else loc_nonce = crypto.randomBytes(16);

        const cipher = crypto.createCipheriv('chacha20', loc_key, loc_nonce);

        let encrypted = cipher.update(data.message, "utf8", "hex");
        encrypted += cipher.final('hex');

        let obj = { nonce: loc_nonce.toString("hex"), encrypted: encrypted.toString("hex") }
        datasetChaCha20.push(obj);
        return res.status(200).json(datasetChaCha20);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const symChaCha20de = async (req, res) => {
    try {
        const data = req.body;
        if (!data) return res.status(400).json({error: 'Data is required'});

        let found;
        if (datasetChaCha20[data.id]) { found = await datasetChaCha20[data.id]; }
        else return res.status(404).json({ error: 'Object Index not found' });

        let loc_key;
        if (data.key) loc_key = Buffer.from(data.key, "hex");
        else return res.status(400).json({error: 'Key is required'});

        let loc_nonce = Buffer.from(found.nonce, 'hex');

        const decipher = crypto.createDecipheriv('chacha20', loc_key, loc_nonce);

        let decrypted = decipher.update(found.encrypted, "hex", "utf8");
        decrypted += decipher.final('utf8');
        return res.status(200).json({decrypted: decrypted.toString("utf8")});

    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal Server Error'});
    }
};

module.exports = {
    AESEncrypt,
    AESDesencrypt,
    symChaCha20en,
    symChaCha20de,
}