const https = require("https");
const fs = require("fs");
const express = require("express");

const app = express();

const ola = (request, response) => {
    response.status(200).json("API rodando com HTTPS");
}

app.route("/").get(ola);

https
    .createServer(
        {
            key: fs.readFileSync("key.pem"),
            cert: fs.readFileSync("cert.pem"),
        },
        app
    )
    .listen(4002, () => {
        console.log("Servidor rodando na porta 4002");
    });
