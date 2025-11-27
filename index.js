//  Importaciones
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const cryptoRoute = require(`./routes/crypto.route`);
app.use("/api/crypto", cryptoRoute);
