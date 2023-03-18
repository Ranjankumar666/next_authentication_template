import { IronSessionOptions } from 'iron-session';
import { withIronSessionSsr } from 'iron-session/next';
import { randomBytes } from 'crypto';
/**
 * @type {IronSessionOptions}
 */

const EXPIRY_DATE = new Date(Date.now() + 2 * (60 * 60 * 1000));
export const sessionOptions = {
	password: randomBytes(16).toString('hex'),
	cookieName: 'sessions-id',
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production',
		expires: EXPIRY_DATE,
	},
};

export const withSessions = withIronSessionSsr(async (ctx) => {
	const user = ctx.req.session.user;

	if (!user) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	return {
		props: {
			authenticated: true,
			user: ctx.req.session.user,
		},
	};
}, sessionOptions);
