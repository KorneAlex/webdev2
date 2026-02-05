export const mainController = {
  index: (request, h) => {
    const viewData = {
        isAuthenticated: request.auth.isAuthenticated,
    };
    // console.log("[ INDEX ]: ", JSON.stringify(request.auth));
    return h.view("index", {
      title: "Home Page",
      message: `Welcome to the Home Page!`,
      viewData: viewData,
    });
  },

  about: (request, h) => {
    const viewData = {
        isAuthenticated: request.auth.isAuthenticated,
    };
    return h.view("./pages/about", { title: "About The project", viewData: viewData });
  },

  dashboard: (request, h) => {
    // console.log("[ DASHBOARD ]: ", JSON.stringify(request.auth));
    const viewData = {
        isAuthenticated: request.auth.isAuthenticated,
    };
    // console.log("[ DASHBOARD ]: ", request.auth.isAuthenticated);
    return h.view("./pages/dashboard", { title: "Dashboard", viewData: viewData });
  },
};