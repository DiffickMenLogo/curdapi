import { v4 } from "uuid";
import users from "../data/users.js";

export class Users {
  async getAllUsers() {
    return new Promise((resolve, _) => resolve(users));
  }

  async getUserById(id) {
    return new Promise((resolve, reject) => {
      const user = users.find((u) => u.id === id);
      resolve(user);
    });
  }

  async createUser(user) {
    return new Promise((reslove, reject) => {
      const newUser = { id: v4(), ...user };
      users.push(newUser);
      reslove(newUser);
    });
  }

  async updateUser(id) {
    return new Promise((resolve, reject) => {
      const user = users.find((u) => u.id === id);
      if (!user) {
        reject("User not found");
      } else {
        const index = users.indexOf(user);
        const updatedUser = { ...user, ...req.body };
        users[index] = updatedUser;
        resolve(updatedUser);
      }
    });
  }

  async deleteUser(id) {
    return new Promise((resolve, reject) => {
      const user = users.find((u) => u.id === id);
      if (!user) {
        reject("User not found");
      } else {
        const index = users.indexOf(user);
        users.splice(index, 1);
        resolve();
      }
    });
  }
}
