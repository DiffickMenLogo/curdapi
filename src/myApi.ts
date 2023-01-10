import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';
import users from './data/users';
import { Users } from './user/user.controller';
import { getReqData } from './utils/utils';

export const myApi = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        if (req.url) {
            if (req.url === '/api/users' && req.method === 'GET') {
                const users = await new Users().getAllUsers();
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(users));
            } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
                const id = req.url.split('/')[3];
                if (!validate(id)) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'UserId is not uuid' }));
                } else if (!users.find((u) => u.id === id)) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'User not found' }));
                } else {
                    const user = await new Users().getUserById(id);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(user));
                }
            } else if (req.url === '/api/users' && req.method === 'POST') {
                const user = await getReqData(req);
                const currentUser = JSON.parse(user as string);
                if (!currentUser.username || !currentUser.age || !currentUser.hobbies) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Please provide all fields' }));
                } else {
                    const newUser = await new Users().createUser(JSON.parse(user as string));
                    res.statusCode = 201;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(newUser));
                }
            } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'PUT') {
                const id = req.url.split('/')[3];
                const user = (await getReqData(req)) as string;
                if (!validate(id)) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'UserId is not uuid' }));
                } else if (!users.find((u) => u.id === id)) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'User not found' }));
                } else {
                    const updatedUser = await new Users().updateUser(id, JSON.parse(user));
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(updatedUser));
                }
            } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'DELETE') {
                const id = req.url.split('/')[3];
                if (!validate(id)) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'UserId is not uuid' }));
                } else if (!users.find((u) => u.id === id)) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'User not found' }));
                } else {
                    await new Users().deleteUser(id);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'User deleted' }));
                }
            } else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Route not found' }));
            }
        }
    } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Server error' }));
    }
};
