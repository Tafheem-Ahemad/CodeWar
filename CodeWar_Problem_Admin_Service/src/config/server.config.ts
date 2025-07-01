import dotenv from 'dotenv';
import { dot } from 'node:test/reporters';

dotenv.config();

export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI;