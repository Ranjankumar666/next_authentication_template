import { User } from '@/model/user';
import { apiHandler } from '@/helpers/api';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/helpers/database';
/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
const login = async (req, res) => {
	const { email, password } =
		typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

	await connectDB();

	const foundUser = await User.findOne({
		email,
	}).exec();

	if (!foundUser) {
		throw new Error('No user with this email exists, Please sign up.');
	}

	if (!bcrypt.compareSync(password, foundUser.password)) {
		throw new Error("Password doesn't match");
	}

	const token = jwt.sign(
		{
			email: foundUser.email,
		},
		process.env.TOKEN_SECRET
	);

	req.session = {
		...req.session,
		user: foundUser.email,
	};
	await req.session.save();

	return res.status(201).json();
};

export default apiHandler({
	post: login,
});
