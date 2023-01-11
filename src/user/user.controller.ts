import { IncomingMessage } from 'http';
import { v4 } from 'uuid';
import users from '../data/users.js';
import { User, UsersService } from '../models/user.model.js';

export class Users implements UsersService {
    async getAllUsers() {
        return new Promise((resolve, _) => resolve(users)) as Promise<User[]>;
    }

    async getUserById(id: string) {
        return new Promise((resolve, reject) => {
            const user = users.find((u: User) => u.id === id) as User;
            resolve(user);
        }) as Promise<User>;
    }

    async createUser(user: User) {
        return new Promise((reslove, reject) => {
            const newId = v4();
            const newUser = { id: newId, ...user };
            users.push(newUser);
            reslove(newUser);
        }) as Promise<User>;
    }

    async updateUser(id: string, body: User) {
        console.log(id, body);
        return new Promise((resolve, reject) => {
            const user = users.find((u: User) => u.id === id);
            if (!user) {
                reject('User not found');
            } else {
                const index = users.indexOf(user);
                const updatedUser = { ...user, ...body };
                users[index] = updatedUser;
                resolve(updatedUser);
            }
        }) as Promise<User>;
    }

    async deleteUser(id: string) {
        return new Promise((resolve, reject) => {
            const user = users.find((u: User) => u.id === id);
            if (!user) {
                reject('User not found');
            } else {
                const index = users.indexOf(user);
                users.splice(index, 1);
                resolve();
            }
        }) as Promise<void>;
    }
}
