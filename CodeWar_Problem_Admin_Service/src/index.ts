import express,{Request,Response} from "express";
import bodyParser from 'body-parser';
import cors from "cors";
import { PORT } from "./config/server.config";
import {errorHandler} from "./utils/ErrorHandler";
import { router } from "./routes/index";

const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

// Allow CORS for all routes
app.use(cors());

// Set up routes
// app.use('/api', router);

app.use(errorHandler);

app.listen(PORT,()=>{
	console.log(`Server is running at http://localhost:${PORT}`);
});