import Joi from "joi";

export const testController = {
  test: (request, h) => {
    const viewData = {
      isAuthenticated: request.auth.isAuthenticated,
    };
    return h.view("./pages/test", { title: "Test", viewData });
  },

  testSubmit: {
    options: {
      validate: {
        payload: Joi.object({
          testInput: Joi.string().min(3).required(),
        }),
        failAction: (request, h, err) => {
          const viewData = {
            isAuthenticated: request.auth.isAuthenticated,
            infoMessage: err.details[0].message,
            infoClass: "has-text-danger",
          };

          return h.view("./pages/test", { title: "Test", viewData }).takeover();
        },
      },
    },

    handler: (request, h) => {
      console.log("Validated payload:", request.payload);

      const viewData = {
        isAuthenticated: request.auth.isAuthenticated,
        infoMessage: "Success!",
        infoClass: "has-text-success",
      };

      return h.view("./pages/test", {
        title: "Result",
        viewData,
      });
    },
  },
};
