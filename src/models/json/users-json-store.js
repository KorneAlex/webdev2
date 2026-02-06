import { v4 } from 'uuid';
import { db } from '../../utils/store-utils.js';

export const usersJsonStore = {
  async getAllUsers() {
    await db.read();
    return db.data.users;
  },

  async getUserByEmail(email) {
    await db.read();
    return db.data.users.find(user => user.email === email);
  },

  async getUserByUsername(username) {
    await db.read();
    return db.data.users.find(user => user.username === username);
  },

  async getUserById(id) {
    await db.read();
    const user = db.data.users.find(u => u._id === id);
    return user ? user : null;
  },

  async addUser(input) {
    await db.read();
    let newUser = {
      _id: v4(),  
      username: input.username,
      email: input.email,
      password: input.password,
    };
    console.log("addUser: newUser: ", newUser);
    const userExist = await this.credentialsCheck(newUser.email, newUser.username, newUser.password);
    if (userExist) {
      return null; // Already exists
    }
    db.data.users.push(newUser);
    await db.write();
    return newUser;
  },

  async userExist(email, username) {
    await db.read();
    let user = await this.getUserByEmail(email);
    if (!user) {
      user = await this.getUserByUsername(username);
    }
    return user ? user : null;
  },

  async credentialsCheck(email, username, pass) {
    await db.read();
    const user = await this.userExist(email, username);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  },
};