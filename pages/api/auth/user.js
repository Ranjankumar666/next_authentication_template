import { apiHandler } from '@/helpers/api';

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
const user = async (req, res) => {
	res.json({
		isLoggedIn: !!req.session.user,
	});
};

export default apiHandler({
	get: user,
});
