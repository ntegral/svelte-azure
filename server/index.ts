import express from 'express';
import compression from 'compression';
import sivr from 'sirv';

require('svelte/register');

const { PORT, NODE_ENV } = process.env;
const env = NODE_ENV === 'development';

// trigger new workflow .. const App = 

export function app() {
    const server = express();
    
    server.use(compression());
    if (NODE_ENV === 'production') {
        server.use(
            sivr('public', { dev: false })
        );
    } else {
        server.use(
            sivr('public', { dev:true })
        )
    }

    server.on('error', (err)=> {
        console.log('Node Server Error', err);
    });

    return server;
}

function run() {
    const port = PORT || 4000;

    // Start up the Node server
    const server = app();

    server.listen(port, () => {
        console.log(`Node Server listening on http://localhost:${port}`);
    });
}

run();