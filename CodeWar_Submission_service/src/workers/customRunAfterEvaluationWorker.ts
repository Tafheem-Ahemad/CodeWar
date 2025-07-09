import {Job, Worker} from 'bullmq';
import redisConnection from "../config/redisConnection";
import axios from 'axios';
import serverConfig from '../config/serverConfig';

export default function CustomRunAfterEvaluationWorker(queuename: string): Worker {
	return new Worker(
		queuename,
		async (job: Job) => {
			if (job.name === 'customRunAfterEvaluationJob') {
				const url =  `${serverConfig.SOCKET_IO_URL}/sendPayload`;
				const payload = {
					...job.data,
					topic : 'customRunService',
				};

				const response = await axios.post(url, payload);
				console.log(response);
			}else{
				throw new Error(`Unknown job name: ${job.name}`);
			}
		},
		{
			connection: redisConnection,
		}
	);
}