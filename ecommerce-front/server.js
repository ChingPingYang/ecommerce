const express = require('express');
const compression = require('compression');
const path = require('path');
const server = express();
const PORT = process.env.PORT || 3000;

server.use(compression());
server.use(express.static(path.join(__dirname, 'build')));
server.use(express.static('../server/public'));
server.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

server.listen(PORT, () => console.log(`react running on ${PORT}...`));