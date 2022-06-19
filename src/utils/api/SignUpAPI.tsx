export async function checkUserIdDuplication(url: string, userId: string) {
	const parameters = userId;
	const requestAPI = url + "/users/new/id-duplication/" + parameters;
	const response = await fetch(requestAPI);
	return response;
}

export async function requestVerificationCode(url: string, discordId: string) {
	const parameters = discordId;
	const requestAPI = url + "/users/new/discord-id-verification/" + parameters;
	const response = await fetch(requestAPI);
	return response;
}

export async function submitVerificationCode(url: string, verifyCode: string) {
	const parameters = verifyCode;
	const requestAPI =
		url + "/users/new/discord-id-verification-code/" + parameters; // FIXME: 나중에 오타 수정
	const response = await fetch(requestAPI);
	return response;
}
