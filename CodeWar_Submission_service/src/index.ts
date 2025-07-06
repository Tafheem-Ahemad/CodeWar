import fastify,{FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import serverConfig from "./config/serverConfig";


const app : FastifyInstance = fastify({
    logger: true,
    trustProxy: true
});


// in fastify, you don't need to explicitly menstion the type of the request and reply objects
// as it infers the types automatically, but you can still do it for clarity
app.get('/', async (req: FastifyRequest, res: FastifyReply) => {
    return { message: 'Welcome to CodeWar Submission Service!' };
});

app.listen({ port: serverConfig.PORT }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`Server listening at ${address}`);
});