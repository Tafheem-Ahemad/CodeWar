import dotenv from "dotenv";

dotenv.config();

const serverConfig = {
	PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3002,
	REDIS_PORT: process.env.REDIS_PORT,
	REDIS_HOST: process.env.REDIS_HOST
}

export default serverConfig;