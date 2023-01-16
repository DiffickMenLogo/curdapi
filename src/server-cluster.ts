import { env } from 'process';
import * as dotenv from 'dotenv';
const cluster = require('cluster');
import { cpus } from 'os';
import { createServer } from 'http';
import { myApi } from './myApi';

dotenv.config();

const numCPUs = cpus().length;
const port = numCPUs + '000';

if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork({ PORT: +port + i });
    }
    cluster.on('exit', (worker: { process: { pid: any } }, code: any, signal: any) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    const server = createServer(myApi);
    server.listen(env.PORT, () => {
        console.log(`Worker ${process.pid} started and listening on port ${env.PORT}`);
    });
}
