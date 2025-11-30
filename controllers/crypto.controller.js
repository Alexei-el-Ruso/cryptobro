const crypto = require('crypto');

const postSHA256Hash =  (req, res) => {
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

const postArgon2Hash = (req, res) => {
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

    } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    postSHA256Hash,
    postArgon2Hash
}