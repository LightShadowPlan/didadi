const app = require('../app');
const fs = require('fs');
const https = require('https');
const http = require('http');

const httpServer = http.createServer(app);

httpServer.listen(3000);

const privateKey = fs.readFileSync('./ssl/0_lightshadow.xyz.key', 'utf8');

const certificate = fs.readFileSync('./ssl/1_lightshadow.xyz_bundle.pem', 'utf8');

const credentials = {key: privateKey, cert: certificate};

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(9191);

