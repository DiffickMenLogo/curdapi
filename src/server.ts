import { env } from 'process';
import * as dotenv from 'dotenv';
import { createServer } from 'http';
import { myApi } from './myApi';

dotenv.config();

const port = env.PORT || 3000;

const server = createServer(myApi);

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
