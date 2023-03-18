import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	try {
		const hashedPassword = await bcrypt.hash(
			this.password,
			+process.env.SALT_ROUNDS
		);

		this.password = hashedPassword;
		return next();
	} catch (err) {
		return next(err);
	}
});

export const User = models.User || model('User', userSchema);
