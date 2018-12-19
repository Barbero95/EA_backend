import * as debug from 'debug';

import * as http from 'http';



import Server from './server';
import { pipeline } from 'stream';
import { ChatServer } from './chat-server';


debug('ts-express:server');



//const port = normalizePort(process.env.PORT || 3000);
const port = 3000;
Server.set('port', port);


//@ts-ignore

console.log('listening on port '+ port);



const server = http.createServer(Server);

server.listen(port);

server.on('error', onError);

server.on('listening', onListening);

let app = new ChatServer().getApp();
export { app };

function normalizePort(val: number | string): number | string | boolean {

  const port: number = typeof val === 'string' ? parseInt(val, 10) : val;

  if (isNaN(port)) {

    return val;

  } else if (port >= 0) {

    return port;

  } else {

    return false;

  }

}



function onError(error: NodeJS.ErrnoException): void {

  if (error.syscall !== 'listen') {

    throw error;

  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {

    case 'EACCES':

      console.error("${bind} requires elevated privileges");

      process.exit(1);

      break;

    case 'EADDRINUSE':

      console.error("${bind} is already in use");

      process.exit(1);

      break;

    default:

      throw error;

  }

}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }

 