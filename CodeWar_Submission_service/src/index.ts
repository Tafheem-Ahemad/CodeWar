import fastify from 'fastify';
import serverConfig from "./config/serverConfig";
import errorHandler from './utils/errorhandlers';


const Fastify = fastify({
    logger: true
});

Fastify.get('/', async () => {
    return { message: 'Welcome to CodeWar Submission Service!' };
});

Fastify.setErrorHandler(errorHandler)

Fastify.listen({ port: serverConfig.PORT }, (err, address) => {
    if (err) {
        Fastify.log.error(err);
        process.exit(1);
    }
    Fastify.log.info(`Server listening at ${address}`);
});