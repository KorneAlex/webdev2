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

  async addUser(user) {
    await db.read();
    user._id = v4();
    db.data.users.push(user);
    await db.write();
    return user;
  },
};