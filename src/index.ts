import { createServer } from 'http';

import * as mod_app from './server';
const app: typeof mod_app = <any>require('./server.ts');
// import schema from './schema'

const server = createServer(app.default);
let currentApp = app.default;

server.listen(8080, () => {
  console.log('Server listening on port 8080');
});

if (module.hot) {
  module.hot.accept(['./server'], () => {
    server.removeListener('request', currentApp);
    currentApp = <any>require('./server.ts').default;
    server.on('request', currentApp);
  });
}

