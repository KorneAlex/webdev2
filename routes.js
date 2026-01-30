import { mainController } from './controllers/main-controller.js';


export const routes = [
    { method: 'GET', path: '/', handler: mainController.homeHandler  },
];