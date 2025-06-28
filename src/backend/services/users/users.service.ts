import UsersModel from "@/models/Users.model";

export const findOrCreateUser = async (payload: any) => {
	const { sub: googleId, email, name, picture, given_name, family_name, email_verified } = payload;

	let user = await UsersModel.findOne({ googleId });

	if (!user) {
		user = await UsersModel.create({
			googleId,
			email,
			name,
			picture,
			given_name,
			family_name,
			email_verified,
		});
	} else {
		const updates: Partial<typeof user> = {};
		if (user.email !== email) updates.email = email;
		if (user.name !== name) updates.name = name;
		if (user.picture !== picture) updates.picture = picture;
		if (user.given_name !== given_name) updates.given_name = given_name;
		if (user.family_name !== family_name) updates.family_name = family_name;
		if (user.email_verified !== email_verified) updates.email_verified = email_verified;

		if (Object.keys(updates).length > 0) {
			await UsersModel.updateOne({ _id: user._id }, updates);
		}
	}

	return user;
};
