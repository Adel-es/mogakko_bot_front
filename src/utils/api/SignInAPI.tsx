export async function logIn(url: string, userId: string, pw: string) {
	const body = JSON.stringify({
		id: userId,
		pw: pw,
	});
	const requestAPI = url + "/login";
	const response = await fetch(requestAPI, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: body,
	});
	return response;
}

export async function getSessionCookie(
	url: string,
	userId: string,
	pw: string
) {
	const body = JSON.stringify({
		id: userId,
		pw: pw,
	});
	const requestAPI = url + "/login/session";
	const response = await fetch(requestAPI, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: body,
	});
	// cookie is in headers; name: Set-Cookie, type: string
	return response;
}

export async function destroySession(url: string) {
	const requestAPI = url + "/login/session";
	const response = await fetch(requestAPI, {
		method: "DELETE",
	});
	return response;
}
