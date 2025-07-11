import dotenv from 'dotenv';

dotenv.config();

export const PORT = Number(process.env.PORT);
export const MONGO_URI = process.env.MONGO_URI;