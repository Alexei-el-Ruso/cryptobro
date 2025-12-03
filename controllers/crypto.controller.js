const crypto = require('crypto');

const SHA256Hash =  (req, res) => {
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

const Argon2Hash = (req, res) => {
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

module.exports = {
    SHA256Hash,
    Argon2Hash
}



