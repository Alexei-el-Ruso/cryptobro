const { webcrypto: { subtle } } = require('crypto');
const crypto = require('crypto');

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

const RSAEncrypt = async (req, res) => {
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

const RSADesencrypt = async (req, res) => {
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

let datasetDSA = [];

const asymDSAsi = (req, res) => {
    try {
        const data = req.body;
        if (!data) return res.status(400).json({error: 'Data is required'});

        const { publicKey, privateKey } = crypto.generateKeyPairSync("dsa", {
            modulusLength: 2048,
            divisorLength: 224,
        });

        const signer = crypto.createSign("sha256");
        signer.update(data.message);
        signer.end();

        const signature = signer.sign(privateKey, "base64");

        datasetDSA.push({publicKey: publicKey.export({type: "spki", format: "pem"}), signature: signature});

        return res.status(200).json(datasetDSA);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const asymDSAve = async (req, res) => {
    try {
        const data = req.body;
        if (!data) return res.status(400).json({error: 'Data is required'});

        let found;
        if (datasetDSA[data.id]) { found = await datasetDSA[data.id]; }
        else return res.status(400).json({ error: 'ID is required' });

        const verifier = crypto.createVerify("sha256");

        verifier.update(data.message);
        verifier.end();

        const validSignature = verifier.verify(found.publicKey, found.signature, "base64");

        return res.status(200).json({
            found_signature: found.signature,
            correct_signature: validSignature
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal Server Error'});
    }
};

module.exports = { 
    RSAEncrypt,
    RSADesencrypt,
    asymDSAsi,
    asymDSAve
};
