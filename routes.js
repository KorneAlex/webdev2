import { mainController } from './controllers/main-controller.js';


export const routes = [
    { method: 'GET', path: '/', handler: mainController.index  },
    { method: 'GET', path: '/login', handler: mainController.login  },
];