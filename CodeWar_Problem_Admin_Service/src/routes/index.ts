import expess from "express";
import { v1Router } from "./v1/index";

export const router = expess.Router();

router.get('/ping', (req, res) => {
	res.json({message: 'API is up and running'});
});

router.use('/v1', v1Router);