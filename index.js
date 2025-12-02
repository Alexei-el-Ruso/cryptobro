//  Importaciones
const express = require('express');
const cors = require('cors');
const http = require("http");

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => { 
    res.send("Hello World!");
});

const cryptoRoute = require(`./routes/crypto.route`);
app.use("/api", cryptoRoute);

const port = process.env.PORT || 3000;
/*const server = */http.createServer(app);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
