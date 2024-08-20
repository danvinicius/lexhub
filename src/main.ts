import { Server } from './server';

(async function () {
  const server = new Server();
  await server.run();
})();
