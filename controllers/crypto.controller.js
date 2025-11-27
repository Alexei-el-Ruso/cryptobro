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

const postArgon2Hash =  (req, res) => {
    try {
        const { data } = req.body;
        if (!data) {
            return res.status(400).json({ error: 'Data is required' });
        }
        parameters = {
            message : Buffer.from(data),
            nonce: crypto.randomBytes(16),
            memoryCost: 2 ** 16,
            timeCost: 5,
            tagLenght: 64,
            parallelism: 1
        };
        const argon2 = crypto.argon2(crypto.argon2d, parameters, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Hashing error' });
            }

            const hash = result.toString("hex");
            return res.status(200).json({ hash });

        });

        return res.status(200).json({ hash });

    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    postSHA256Hash,
    postArgon2Hash
}