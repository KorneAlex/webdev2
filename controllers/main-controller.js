export const mainController = {
    homeHandler: (request, h) => {
        return h.view('index', { title: 'Home Page', message: 'Welcome to the Home Page!' });
    }
};