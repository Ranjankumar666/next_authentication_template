import mongoose from 'mongoose';
import { errorHandler } from './errorHandler';

const DB_URL = process.env.DB_URL;

if (!DB_URL) {
	throw new Error('Invalid database Uri');
}

// caching to be
const connection = {};

export const connectDB = async () => {
	if (connection.isConnected) {
		return;
	}
	try {
		const db = await mongoose.connect(DB_URL, {
			dbName: 'xenonstack',
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		connection.isConnected = db.connections[0].readyState;
	} catch (err) {
		throw new Error(`Database Error : ${err.message}`);
	}
};
