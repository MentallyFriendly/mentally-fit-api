import { createServer } from 'http';

import * as mod_app from './server';

const app: typeof mod_app = <any>require('./server.ts');

const server = createServer(app.default);

server.listen(8080, () => {
  console.log('Server listening on port 8080');
});