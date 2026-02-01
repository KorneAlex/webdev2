// db_flow_1.1: server setup with db initialization

import { routes } from './routes.js';
import Hapi from "@hapi/hapi";
import Handlebars from "handlebars";
import Vision from "@hapi/vision";
import { db } from './src/models/db.js';


const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route(routes);

    // Initialize database
    await db.init();

    await server.register(Vision);

    server.views({
        engines: {
            hbs: Handlebars
        },
        relativeTo: ".",
        path: 'src/views',
        partialsPath: './src/views/partials',
        layout: true,
        layoutPath: './src/views/layouts'
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();