import * as http from 'http';


const httpServer = http.createServer(function (request: http.IncomingMessage, response: http.ServerResponse) {
    response.write('<h1>FUCK</h1>')
    response.end()
});

httpServer.listen(3000, () => {
    console.log('Sever Open');
});

