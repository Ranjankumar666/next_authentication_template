import { withIronSessionApiRoute } from 'iron-session/next';
import { errorHandler } from './errorHandler';
import { sessionOptions } from './sessions';

export const apiHandler = (handler) => {
	return withIronSessionApiRoute(async (req, res) => {
		const method = req.method.toLowerCase();

		if (!handler[method]) {
			return res.status(404).end(`Method ${req.method} not found`);
		}

		try {
			await handler[method](req, res);
		} catch (err) {
			errorHandler(err, res);
		}
	}, sessionOptions);
};
