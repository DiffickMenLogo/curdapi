export interface User {
    id: string;
    username: string;
    hobbies: Array<string>;
    age: number;
}

export interface UsersService {
    getAllUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    createUser(user: User): Promise<User>;
    updateUser(id: string, req: any): Promise<User>;
    deleteUser(id: string): Promise<void>;
}
