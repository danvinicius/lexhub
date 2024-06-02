import { Server } from './server';

(async function () {
  const server = Server.getInstance();
  await server.run();
})();
