export async function createUserProfile(
	url: string,
	userId: string,
	pw: string,
	discordId: string
) {
	const body = JSON.stringify({
		id: userId,
		pw: pw,
		discord_id: discordId,
	});
	body.replace("discord_id", "discord-id");
	const requestAPI = url + "/users";
	const response = await fetch(requestAPI, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: body,
	});
	return response;
}
export async function getUserProfile(url: string, userId: string) {
	const parameters = userId;
	const requestAPI = url + "/users/" + parameters;
	const response = await fetch(requestAPI);
	return response;
}

export async function updateUserProfile(
	url: string,
	userId: string,
	pw: string,
	profileMemo: string
) {
	const parameters = userId;
	const body = JSON.stringify({
		pw: pw,
		profile_memo: profileMemo,
	});
	body.replace("profile_memo", "profile-memo"); // TODO: -> profile-memo => memo
	const requestAPI = url + "/users/" + parameters;
	const response = await fetch(requestAPI, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: body,
	});
	return response;
}

export async function deleteUserProfile(url: string, userId: string) {
	const paramters = userId;
	const requestAPI = url + "/users/" + paramters;
	const response = await fetch(requestAPI, {
		method: "DELETE",
	});
	return response;
}
