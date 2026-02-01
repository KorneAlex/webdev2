import { routes } from './routes.js';
import Hapi from "@hapi/hapi";
import Handlebars from "handlebars";
import Vision from "@hapi/vision";


const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route(routes);

    await server.register(Vision);

    server.views({
        engines: {
            hbs: Handlebars
        },
        relativeTo: ".",
        path: 'views',
        partialsPath: './views/partials',
        layout: true,
        layoutPath: './views/layouts'
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();