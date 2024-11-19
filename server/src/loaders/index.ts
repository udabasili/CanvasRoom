import expressLoader from './express';
import mssqlLoader from './database';
import Logger from './logger';
//We have to import at least all the events once so they can be triggered
import { Application } from 'express';

export default async ({ expressApp }: { expressApp: Application }) => {
	await mssqlLoader();
	Logger.info('✌️ DB loaded and connected!');

	// It returns the agenda instance because it's needed in the subsequent loaders

	await expressLoader({ app: expressApp });
	Logger.info('✌️ Express loaded');
};
