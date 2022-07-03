export const checkEnableUserIDPattern = (userID: string) => {
	//4자리 이상 20자 이하 (영어대소문자, 숫자, 특수문자(_, -)
	const testRegex: RegExp = /[a-zA-Z0-9\-_]{3,20}/;
	const testResult: RegExpExecArray | null = testRegex.exec(userID);
	if (testResult !== null && testResult[0] === userID) return true;
	else return false;
};
export const checkEnablePasswordPattern = (password: string) => {
	// 8자 이상 16자 이하, 영어 대소문자 숫자 특수문자
	const testRegex: RegExp =
		/[a-zA-Z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{8,16}/;
	const testResult: RegExpExecArray | null = testRegex.exec(password);
	if (testResult !== null && testResult[0] === password) return true;
	else return false;
};
