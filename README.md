# ApiNodeHTTPS
Exemplo de criação de API com NODE rodando sobre HTTPS com certificado autoassinado

# Inicialize o package.json
npm init -y

# Atualize o elemento scripts do package.json
 "scripts": {
    "start" : "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }

# Instale o Express 

npm i express

# Crie o certificado SSL

# 1. Gere um key file que será usado para auto assinar o certificado. Ele irá criar um arquivo chamado key.pem

openssl genrsa -out key.pem

# 2. Depois gere um certificate service request (CSR). Ele é necessário como entrada para criar o certificado

openssl req -new -key key.pem -out csr.pem

# 3. Gere o certificado com data de expiração de 9999 dias. 

openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem

# Crie o arquivo index.js
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

# Rode a API com o comando npm start

npm start

# Acesse a API 

https://localhost:4002/

# Tutorial usado na criação da API

https://adamtheautomator.com/https-nodejs/




