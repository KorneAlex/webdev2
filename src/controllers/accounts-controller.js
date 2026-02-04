// db_flow_3: uses the initialized stores in controller functions

import { db } from "../models/db.js";

export const accountController = {
  signup: (request, h) => {
    const viewData = {
        isAuthenticated: request.auth.isAuthenticated,
    };
    return h.view("./pages/signup", { title: "signup Page", viewData: viewData });
  },

  signupSubmit: async (request, h) => {
    const payload = request.payload;
    console.log(`Signup submitted: ${JSON.stringify(payload)}`);
    await db.usersStore.addUser(payload);
    return h.redirect("/signup-success");
  },

  signupSuccess: (request, h) => {
    const viewData = {
        isAuthenticated: request.auth.isAuthenticated,
    };
    return h.view("./pages/signup-success", {
      title: "Signup Successful",
      message: "You have successfully signed up!",
      viewData: viewData,
    });
  },

  login: (request, h) => {
    const viewData = {
        isAuthenticated: request.auth.isAuthenticated,
    };
    console.log("[ LOGIN ]: ", JSON.stringify(request.auth));
    return h.view("./pages/login", { title: "Login Page", viewData: viewData });
  },

  loginSubmit: async (request, h) => {
    const { emailOrUsername, password } = request.payload;

    const user = await db.usersStore.userCheck(emailOrUsername, password);
    if (!user) {
      return h.view("./pages/login", {
        title: "Login Page",
        viewData: { wrongCredentials: true },
      });
    }

    request.cookieAuth.set({ id: user._id });
    console.log("[LOGIN_SUBMIT] User authenticated, setting cookie with id:", user._id);

    return h.redirect("/dashboard");
  },

  logout: (request, h) => {
    request.cookieAuth.clear();
    return h.redirect("/");
  },
};
