import net from 'net';
import { HOST, PORT } from './constants/env.js';
import initServer from './init/index.js';
import { onConnection } from './events/onConnection.js';

const server = net.createServer(onConnection);

initServer()
  .then(() => {
    server.listen(PORT, HOST, () => {
      console.log(`서버 실행 중: ${HOST}:${PORT}`);
    });
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
