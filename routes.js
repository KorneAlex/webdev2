import { mainController } from './src/controllers/main-controller.js';
import { accountController } from './src/controllers/accounts-controller.js';


export const routes = [
    // pages
    { method: 'GET', path: '/', handler: mainController.index  },
    { method: 'GET', path: '/login', handler: mainController.login  },
    { method: 'GET', path: '/singup', handler: mainController.singup  },
    { method: 'GET', path: '/about', handler: mainController.about  },
    { method: 'GET', path: '/singup-success', handler: mainController.singupSuccess  },

    // buttons
    { method: 'POST', path: '/singup/submit', handler: accountController.singupSubmit  }
];