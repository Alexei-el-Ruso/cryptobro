var crypto = require('crypto');

const postSHA256 = (req, res) => {
    try {
        const data = req.body;
        var salted ? data.salt : null;
        const hashed =
        return res.status(200).send({})
    } catch (error) {
        res.status(500).send({error: error.message});
    }
}