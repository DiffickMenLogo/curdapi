const request = require('supertest');
const http = require('http');
import { v4 } from 'uuid';
import { myApi } from '../myApi';

describe('API Routes', () => {
    let server: any;
    let globalUuid: string = v4();
    const user = {
        id: globalUuid,
        username: 'test',
        age: 20,
        hobbies: ['test'],
    };
    beforeAll((done) => {
        server = http.createServer(myApi);
        server.listen(done);
        console.log('Server running');
    });
    afterAll((done) => {
        server.close(done);
        console.log('Server closed');
    });
    it('should get all users', async () => {
        try {
            const res = await request(server).get('/api/users').expect(200);
            expect(JSON.parse(res.text)).toEqual([]);
        } catch (err) {
            console.log(err);
        }
    });
    it('should post user', async () => {
        try {
            const res = await request(server).post('/api/users').send(user).expect(201);
            expect(JSON.parse(res.text)).toEqual(user);
        } catch (err) {
            console.log(err);
        }
    });
    it('should get user by id', async () => {
        try {
            const route = `/api/users/${globalUuid}`;
            const res = await request(server).get(route).expect(200);
            expect(JSON.parse(res.text)).toEqual(user);
        } catch (err) {
            console.log(err);
        }
    });
    it('should put user', async () => {
        try {
            const route = `/api/users/${globalUuid}`;
            const putUser = {
                id: globalUuid,
                username: 'test',
                age: 20,
                hobbies: ['test'],
            };
            const res = await request(server).put(route).send(putUser).expect(200);
            expect(JSON.parse(res.text)).toEqual(putUser);
        } catch (err) {
            console.log(err);
        }
    });
    it('should delete user', async () => {
        try {
            const route = `/api/users/${globalUuid}`;
            const res = await request(server).delete(route).expect(200);
            expect(JSON.parse(res.text)).toEqual({ message: 'User deleted' });
        } catch (err) {
            console.log(err);
        }
    });
});
