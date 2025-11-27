
const crypto = require('crypto');

const getSHA256Hash =  (req, res) => {
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

module.exports = {
    getSHA256Hash,
    encriptData
}