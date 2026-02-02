import { mainController } from './src/controllers/main-controller.js';
import { accountController } from './src/controllers/accounts-controller.js';


export const routes = [
    // pages
    { method: 'GET', path: '/', handler: mainController.index  },
    { method: 'GET', path: '/about', handler: mainController.about  },
    { method: 'GET', path: '/dashboard', handler: mainController.dashboard },

    // account pages
    { method: 'GET', path: '/login', handler: accountController.login  },
    { method: 'GET', path: '/singup', handler: accountController.singup  },
    { method: 'GET', path: '/singup-success', handler: accountController.singupSuccess  },

    // buttons
    { method: 'POST', path: '/singup/submit', handler: accountController.singupSubmit  },
    { method: 'POST', path: '/login/submit', handler: accountController.loginSubmit  },
];