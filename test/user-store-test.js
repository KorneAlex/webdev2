import M from "mocha";
import { assert } from "chai";
import { db } from "../src/models/db.js";
import { db as storeDb } from "../src/utils/store-utils.js";

export const userStoreTest = M.suite("User Store Tests", () => {
  let lastIndex;
  M.before(async () => {
    await db.init();
    if (db.usersStore) {
      const users = await db.usersStore.getAllUsers();
      lastIndex = users.length - 1;
    }
  });

  M.describe("Create Users", () => {

    // users
    const regular = {
      username: "alex",
      email: "alex@test.com",
      password: "password",
      repeatPassword: "password",
    };

    M.it("regular user", async () => {
      const user = await db.usersStore.addUser(regular);
      assert.isNotNull(user), "user was not created";
      assert.equal(user.username, regular.username);
      assert.equal(user.email, regular.email);
    });

    M.it("duplicate email", async () => {
      assert.isNull(await db.usersStore.addUser(regular), "Duplicate email should not be allowed");
    });

    M.after(async () => {
      const users = await db.usersStore.getAllUsers();
      storeDb.data.users = users.slice(0, lastIndex + 1);
      await storeDb.write();
    });
  });
});
