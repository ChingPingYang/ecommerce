const express = require('express');
const path = require('path');
const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.static(path.join(__dirname, 'build')));
server.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

server.listen(PORT, () => console.log(`react running on ${PORT}...`));