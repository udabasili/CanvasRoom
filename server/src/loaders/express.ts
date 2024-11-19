import express, {Application, NextFunction} from 'express';
import cors from 'cors';
import routes from '@/api';
import config from "@/config";

export default ({ app }: { app: Application }) => {
	/**
	 * Health Check endpoints
	 * @TODO Explain why they are here
	 */

	app.get('/status', (req, res) => {
		res.status(200).end();
	});

	app.head('/status', (req, res) => {
		res.status(200).end();
	});


	app.use(express.json());

	app.use(express.urlencoded({ extended: true }));

	app.use(cors());

	app.use(config.api.prefix, routes());

	/// error handlers


	app.use((err: { status: any; message: any; }, req: any, res: {
		status: (arg0: any) => void;
		json: (arg0: { errors: { message: any; }; }) => void;
	}, next: any) => {
		res.status(err.status || 500);
		res.json({
			errors: {
				message: err.message,
			},
		});
	});

	app.use((req: any, res: any, next: NextFunction) => {
		const error = new Error('Not found');
		res.status(404);
		next(error);
	})
};
