export const mainController = {
    index: (request, h) => {
        return h.view('index', { title: 'Home Page', message: 'Welcome to the Home Page!'});
    },

    about: (request, h) => {
        return h.view('./pages/about', { title: 'About The project' });
    },

    dashboard: (request, h) => {
        return h.view('./pages/dashboard', { title: 'Dashboard'});
    }
};