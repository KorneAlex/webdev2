export const mainController = {
    index: (request, h) => {
        return h.view('index', { title: 'Home Page', message: 'Welcome to the Home Page!'});
    },

    login: (request, h) => {
        return h.view('./pages/login', { title: 'Login Page' });
    }
};