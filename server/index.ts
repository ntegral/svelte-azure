import express from 'express';
import compression from 'compression';
import sivr from 'sirv';

require('svelte/register');

const { PORT, NODE_ENV } = process.env;
const env = NODE_ENV === 'development';

// trigger new workflow //

export function app() {
    const server = express();
    
    server.use(compression());
    if (NODE_ENV === 'production') {
        server.use(
            sivr('public', { dev: false, single: true, gzip: true })
        );
    } else {
        server.use(
            sivr('public', { dev:true, single: true, gzip: true })
        )
    }

    // All regular routes use the Universal engine
    server.get('*', (req, res, next) => { 
        if (NODE_ENV === 'production') {
            sivr('public', { dev: false, single: true })
        } else {
            sivr('public', { dev: true, single: true })
        }
    })

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