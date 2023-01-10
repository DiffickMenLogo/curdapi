import { v4 } from 'uuid';
import { User } from '../models/user.model';

const users: User[] = [
    {
        id: v4(),
        username: 'Diffick',
        age: 25,
        hobbies: ['Coding', 'Gaming', 'Reading'],
    },
    {
        id: v4(),
        username: 'John',
        age: 30,
        hobbies: ['Coding', 'Music', 'Swimming'],
    },
    {
        id: v4(),
        username: 'Jane',
        age: 20,
        hobbies: ['Coding', 'Gaming', 'Swapping'],
    },
];

export default users;
