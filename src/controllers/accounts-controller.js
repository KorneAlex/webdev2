// db_flow_3: uses the initialized stores in controller functions
import { db } from "../models/db.js";
import { signupSchema } from "../models/joi-schema.js";

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

  signupSubmit: {
    options: {
      auth: false,
      validate: {
        payload: signupSchema,
        failAction: (request, h, err) => {
          const viewData = {
            isAuthenticated: request.auth.isAuthenticated,
            infoMessage: err.details[0].message,
            infoClass: "has-text-danger",
          };
          return h
          .view("./pages/signup", { title: "Signup Page", viewData })
          .takeover();
        },
      },
    },
    handler: async (request, h) => {
      const payload = request.payload;

      const viewData = {
        isAuthenticated: request.auth.isAuthenticated,
        infoMessage: "Signup successful! Please log in.",
        infoClass: "has-text-success",
      };
      await db.usersStore.addUser(payload);
      return h.view("./pages/login", {
        title: "Signup Successful",
        viewData: viewData,
      });
    },
  },

  login: (request, h) => {
    const viewData = {
      isAuthenticated: request.auth.isAuthenticated,
    };
    return h.view("./pages/login", { title: "Login Page", viewData: viewData });
  },

  // TODO: add anti-sql injection (Joi) to loginSubmit and signupSubmit
  loginSubmit: async (request, h) => {
    const { emailOrUsername, password } = request.payload;

    const user = await db.usersStore.userCheck(emailOrUsername, password);
    if (!user) {
      return h.view("./pages/login", {
        title: "Login Page",
        viewData: {
          infoMessage: "Invalid credentials. Please try again.",
          infoClass: "has-text-danger",
        },
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
