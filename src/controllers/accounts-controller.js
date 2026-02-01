// db_flow_3: uses the initialized stores in controller functions

import { db } from '../models/db.js';

export const accountController = {
    singupSubmit: async (request, h) => {
        const payload = request.payload;
        console.log(`Signup submitted: ${JSON.stringify(payload)}`);
        await db.usersStore.addUser(payload);
        return h.redirect('/singup-success');
    },

    login: (request, h) => {
        return h.view('login', { title: 'Login' });
    },
};