//  Importaciones
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const userRoute = require(`./routes/user.route`);
app.use("/api/users", userRoute);
