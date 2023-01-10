const request = require('supertest');
const http = require('http');
import { v4 } from 'uuid';
import users from '../data/users';
import { myApi } from '../myApi';

describe('API Routes', () => {
    let server: any;
    beforeAll((done) => {
        server = http.createServer(myApi);
        server.listen(done);
    });
    afterAll((done) => {
        server.close(done);
    });
    it('should get all users', async () => {
        const res = await request(server).get('/api/users').expect(200);
        expect(JSON.parse(res.text)).toEqual(users);
    });
    it('should get user by id', async () => {
        const uuid = users[0].id;
        const route = `/api/users/${uuid}`;
        const res = await request(server).get(route).expect(200);
        expect(JSON.parse(res.text)).toEqual(users[0]);
    });
    it('should post user', async () => {
        const user = {
            id: v4(),
            username: 'test',
            age: 20,
            hobbies: ['test'],
        };
        const res = await request(server).post('/api/users').send(user).expect(201);
        expect(JSON.parse(res.text)).toEqual(user);
    });
    it('should put user', async () => {
        const uuid = users[0].id;
        const route = `/api/users/${uuid}`;
        const user = {
            id: v4(),
            username: 'test',
            age: 20,
            hobbies: ['test'],
        };
        const res = await request(server).put(route).send(user).expect(200);
        expect(JSON.parse(res.text)).toEqual(user);
    });
    it('should delete user', async () => {
        const uuid = users[0].id;
        const route = `/api/users/${uuid}`;
        const res = await request(server).delete(route).expect(200);
        expect(JSON.parse(res.text)).toEqual({ message: 'User deleted' });
    });
});
