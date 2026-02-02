// db_flow_3: uses the initialized stores in controller functions

import { db } from "../models/db.js";

export const accountController = {
  singup: (request, h) => {
    return h.view("./pages/singup", { title: "Singup Page" });
  },

  singupSubmit: async (request, h) => {
    const payload = request.payload;
    console.log(`Signup submitted: ${JSON.stringify(payload)}`);
    await db.usersStore.addUser(payload);
    return h.redirect("/singup-success");
  },

  singupSuccess: (request, h) => {
    return h.view("./pages/singup-success", {
      title: "Signup Successful",
      message: "You have successfully signed up!",
    });
  },

  login: (request, h) => {
    // When first visiting the login page, ensure the "login failed" message is hidden
    const viewData = {
      logedIn: true,
    };
    return h.view("./pages/login", { title: "Login Page", viewData });
  },

  loginSubmit: async (request, h) => {
    const { emailOrUsername, password } = request.payload;
    let user = await db.usersStore.getUserByEmail(emailOrUsername);
    if (!user) {
      user = await db.usersStore.getUserByUsername(emailOrUsername);
    }
    if (user && user.password === String(password)) {
      return h.redirect("/dashboard");
    } else {
      // On failed login, render the login page again with a flag
      // that causes the "login failed" partial to be shown
      const viewData = {
        logedIn: false,
      };
      return h.view("./pages/login", { title: "Login Page", viewData });
    }
  },
};
