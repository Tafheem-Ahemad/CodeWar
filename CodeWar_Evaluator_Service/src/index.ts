import bodyParser from "body-parser";
import express, { Express ,Request , Response } from "express";
import cors from "cors";
import serverConfig from "./config/service.config";
import bullBoardAdapter from "./config/bullBoard.config";

const app: Express = express();

app.use(cors())

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.get('/', (req:Request, res:Response) => {
	  res.send('CodeWar Evaluator Service is running');
});

app.use('/ui', bullBoardAdapter.getRouter());
// app.use('/api', apiRouter);

app.listen(serverConfig.PORT, () => {
  console.log(`Server is running at http://localhost:${serverConfig.PORT}`);
  
});