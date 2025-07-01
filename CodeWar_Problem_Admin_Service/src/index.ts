import express,{Request,Response} from "express";
import bodyParser from 'body-parser';
import cors from "cors";
import { PORT } from "./config/server.config";
import {errorHandler} from "./utils/ErrorHandler";

const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use(cors());

app.get("/ping",(req:Request,res:Response)=>{
	res.send({Message:"Hellow World"})
})


app.use(errorHandler)

app.listen(PORT,()=>{
	console.log(`Server is running at http://localhost:${PORT}`);
})