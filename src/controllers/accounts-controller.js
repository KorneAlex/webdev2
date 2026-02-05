// db_flow_3: uses the initialized stores in controller functions
import { db } from "../models/db.js";

export const accountController = {
  signup: (request, h) => {
    const viewData = {
      isAuthenticated: request.auth.isAuthenticated,
    };
    return h.view("./pages/signup", {
      title: "signup Page",
      viewData: viewData,
    });
  },

  signupSubmit: async (request, h) => {
    const payload = request.payload;
    // console.log(`Signup submitted: ${JSON.stringify(payload)}`);
    const viewData = {
      isAuthenticated: request.auth.isAuthenticated,
      infoMessage: "Signup successful! Please log in.",
      infoClass: "has-text-success",
    };
    await db.usersStore.addUser(payload);
    return h.view("./pages/login", { title: "Signup Successful", viewData: viewData });
  },

  // signupSuccess: (request, h) => {
  //   const viewData = {
  //     isAuthenticated: request.auth.isAuthenticated,
  //     infoMessage: "You have successfully signed up! Please log in.",
  //   };
  //   return h.view("./pages/login", { title: "Signup Successful", viewData: viewData,
  //   });
  // },

  login: (request, h) => {
    const viewData = {
      isAuthenticated: request.auth.isAuthenticated,
      // infoMessage: "Please log in to your account.",
    };
    return h.view("./pages/login", { title: "Login Page", viewData: viewData });
  },

  loginSubmit: async (request, h) => {
    const { emailOrUsername, password } = request.payload;

    const user = await db.usersStore.userCheck(emailOrUsername, password);
    if (!user) {
      return h.view("./pages/login", {
        title: "Login Page",
        viewData: { infoMessage: "Invalid credentials. Please try again.", infoClass: "has-text-danger" },
      });
    }

    request.cookieAuth.set({ id: user._id });
    return h.redirect("/dashboard");
  },

  logout: (request, h) => {
    request.cookieAuth.clear();
    return h.redirect("/");
  },
};
