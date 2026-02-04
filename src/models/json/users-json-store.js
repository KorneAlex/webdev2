import { v4 } from 'uuid';
import { db } from '../../utils/store-utils.js';

export const usersJsonStore = {
  async getAllUsers() {
    await db.read();
    return db.data.users;
  },

  async getUserByEmail(email) {
    // console.log("getUserByEmail: email: ", email);
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

  async addUser(user) {
    await db.read();
    user._id = v4();
    db.data.users.push(user);
    await db.write();
    return user;
  },

  async userCheck(emailOrUsername, pass) {
    await db.read();
    // console.log("userCheck: emailOrUsername, pass: ", emailOrUsername, pass);
    let user = await this.getUserByEmail(emailOrUsername);
    if (!user) {
      user = await this.getUserByUsername(emailOrUsername);
    }
    if (user && user.password === pass) {
      return user;
    }
    return null;
  },
};