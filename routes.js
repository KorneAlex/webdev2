// auth: https://hapi.dev/tutorials/auth/?lang=en_US

import { mainController } from './src/controllers/main-controller.js';
import { accountController } from './src/controllers/accounts-controller.js';


export const routes = [
    // pages
    { method: 'GET', path: '/', handler: mainController.index, options: { auth: { mode: 'try' } } },
    { method: 'GET', path: '/about', handler: mainController.about},
    { method: 'GET', path: '/dashboard', handler: mainController.dashboard },

    // account pages
    { method: 'GET', path: '/login', handler: accountController.login, options: { auth: false } },
    { method: 'GET', path: '/signup', handler: accountController.signup, options: { auth: false } },
    { method: 'GET', path: '/signup-success', handler: accountController.signupSuccess, options: { auth: false } },

    // account actions
    { method: 'POST', path: '/signup/submit', handler: accountController.signupSubmit, options: { auth: false } },
    { method: 'POST', path: '/login/submit', handler: accountController.loginSubmit, options: { auth: false } },
    { method: 'GET', path: '/logout', handler: accountController.logout, options: { auth: false } },
    
   
];