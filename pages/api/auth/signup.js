import { User } from '@/model/user';
import { apiHandler } from '@/helpers/api';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/helpers/database';

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
const signup = async (req, res) => {
	const { email, password } =
		typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

	await connectDB();

	const foundUser = await User.findOne({
		email,
	}).exec();

	if (foundUser) {
		throw new Error('User already exists, please log in');
	}

	const newUser = new User({
		email,
		password,
	});

	await newUser.save();

	const token = jwt.sign(
		{
			email: newUser.email,
		},
		process.env.TOKEN_SECRET
	);

	req.session = {
		...req.session,
		user: newUser.email,
	};
	await req.session.save();

	return res.status(201).json();
};

export default apiHandler({
	post: signup,
});
