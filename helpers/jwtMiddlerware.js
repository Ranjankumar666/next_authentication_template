import jwt, { decode } from 'jsonwebtoken';

export const jwtMiddleware = async (req, res) => {
	const token = req.headers.authorization;
	if (token) throw new Error('UnauthorizedError');

	try {
		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

		res.user = decodedToken;
	} catch (err) {
		throw new Error('UnauthorizedError');
	}
};
