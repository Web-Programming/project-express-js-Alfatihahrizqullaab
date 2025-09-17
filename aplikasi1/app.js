const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-type", "text/plain");
    res.end('Hello Word\n');


});

server.listen(3000, () => {
    console.log('Server running at https://localhost:3000/');
});