import M from "mocha";
import { assert } from "chai";
import { db } from "../src/models/db.js";
import { usersStore } from "../src/models/mongodb/user-mongodb-store.js";

export const mongodbTests = M.suite("MongoDB Tests", () => {
  M.before(async () => {
    await db.init();
  });

  M.describe("Users Collection", () => {
    const testUser = {
      username: "johndoe",
      email: "john.doe@example.com",
      password: "password123",
    };

    M.afterEach(async () => {
      const user = await usersStore.getUserByEmail(testUser.email);
      if (user) {
        await usersStore.deleteUserById(user._id);
      }
    });

    M.it("should create a new user", async () => {
      const savedUser = await usersStore.addUser(testUser);
      assert.isNotNull(savedUser._id, "User ID should not be null");
      assert.equal(savedUser.username, testUser.username);
      assert.equal(savedUser.email, testUser.email);
      assert.equal(savedUser.password, testUser.password);
    });

    M.it("should retrieve a user by email", async () => {
      await usersStore.addUser(testUser);
      const user = await usersStore.getUserByEmail(testUser.email);
      assert.isNotNull(user, "User should be found");
      assert.equal(user.username, testUser.username);
      assert.equal(user.email, testUser.email);
    });
  });
});
