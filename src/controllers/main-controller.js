export const mainController = {
    index: (request, h) => {
        return h.view('index', { title: 'Home Page', message: 'Welcome to the Home Page!'});
    },

    login: (request, h) => {
        return h.view('./pages/login', { title: 'Login Page' });
    },

    singup: (request, h) => {
        return h.view('./pages/singup', { title: 'Singup Page' });
    },

    singupSuccess: (request, h) => {
        return h.view('./pages/singup-success', { title: 'Signup Successful', message: 'You have successfully signed up!' });
    },

    about: (request, h) => {
        return h.view('./pages/about', { title: 'About The project' });
    }
};