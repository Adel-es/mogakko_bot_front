import { Button, Grid, TextField, Box, createTheme } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { Context } from "..";
import {
	checkUserIdDuplication,
	requestVerificationCode,
	submitVerificationCode,
} from "../utils/api/SignUpAPI";
import { DiscordIDCertification } from "../components/signup/DiscordIDCertification";
import { Registration } from "../components/signup/Registration";
import { RegistrationComplete } from "../components/signup/RegistrationComplete";
import { createUserProfile } from "../utils/api/UserAPI";
import {
	checkEnableUserIDPattern,
	checkEnablePasswordPattern,
} from "../utils/signup/SignUpUtils";

const enum CertNumState {
	NoCheck = 1,
	WrongNum = 2,
	CorrectNum = 10,
}
export const enum DiscordIDState {
	NoRequestCertNum = 0,
	EmptyDiscordID = 1,
	WrongDiscordID = 2,
	SuccessToRequestCertNum = 10,
}
export const enum PasswordState {
	NoTyping = 0,
	NoCheck = 1,
	MismatchPattern = 2,
	EnablePassword = 10,
}
export const enum ConfirmPasswordState {
	NoTyping = 0,
	WrongPassword = 1,
	CorrectPassword = 10,
}
export const enum UserIDState {
	NoTyping = 0,
	NoCheck = 1,
	DuplicatedID = 2,
	MismatchPattern = 3,
	EnableID = 10,
}
function SignUp() {
	const [discordID, setDiscordID] = useState("");
	const [requestCertNum, setRequestCertNum] = useState<DiscordIDState>(
		DiscordIDState.NoRequestCertNum
	); // => snackbar
	const [certificationNum, setCertificationNum] = useState("");
	const [certificationNumState, setCertificationNumState] =
		useState<CertNumState>(CertNumState.NoCheck);

	const [userID, setUserID] = useState(""); // ID 중복 체크 하기
	const [userIDState, setUserIDState] = useState<UserIDState>(
		UserIDState.NoTyping
	);
	const [password, setPassword] = useState("");
	const [passwordState, setPasswordState] = useState<PasswordState>(
		PasswordState.NoTyping
	);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [confirmPasswordState, setConfirmPasswordState] =
		useState<ConfirmPasswordState>(ConfirmPasswordState.NoTyping);
	const [register, setRegister] = useState(false);
	const { url } = useContext(Context);

	const handleChangeDiscordID = (event: any) => {
		setDiscordID(event.target.value);
	};
	const handleClickRequestCertNum = () => {
		if (discordID === "") {
			// TODO: discordID textfield가 error로 표시되도록 하기
			console.log("ID가 비어있습니다.");
			setRequestCertNum(DiscordIDState.EmptyDiscordID);
		} else {
			requestVerificationCode(url, discordID).then((response) => {
				if (response.status === 200) {
					console.log("인증번호 전송됨");
					setRequestCertNum(DiscordIDState.SuccessToRequestCertNum);
				} else {
					setRequestCertNum(DiscordIDState.WrongDiscordID);
				}
			});
		}
	};
	const handleCheckCertNum = () => {
		// if (requestCertNum !== RequestCertNumState.SuccessToRequest) {
		// 	console.log("인증번호가 발급되지 않았습니다.");
		// 	return;
		// }
		if (certificationNum === "") {
			console.log("인증번호를 입력해주십시오.");
			return;
		}
		submitVerificationCode(url, certificationNum).then((response) => {
			if (response.status === 200) {
				console.log("인증번호 유효함");
				setCertificationNumState(CertNumState.CorrectNum);
			} else {
				console.log("인증번호 틀림");
				setCertificationNumState(CertNumState.WrongNum);
			}
		});
	};
	const handleSuccessToRequestCertNum = () => {
		setRequestCertNum(DiscordIDState.NoRequestCertNum);
	};
	const handleChangeCertNum = (event: any) => {
		setCertificationNum(event.target.value);
	};
	const handleChangeUserID = (event: any) => {
		setUserID(event.target.value);
		setUserIDState(UserIDState.NoCheck);
	};
	const handleCheckUserIDDuplication = () => {
		checkUserIdDuplication(url, userID).then((response) => {
			if (response.status === 200) {
				console.log("사용가능한 아이디");
				setUserIDState(UserIDState.EnableID);
			} else {
				console.log("중복된 아이디");
				setUserIDState(UserIDState.DuplicatedID);
			}
		});
	};
	const handleSetUserIDStateNoCheck = () => {
		setUserIDState(UserIDState.NoCheck);
	};
	const handleChangePassword = (event: any) => {
		setPassword(event.target.value);
		setPasswordState(PasswordState.NoCheck);
		if (confirmPasswordState !== ConfirmPasswordState.NoTyping) {
			if (event.target.value === confirmPassword) {
				setConfirmPasswordState(ConfirmPasswordState.CorrectPassword);
			} else {
				setConfirmPasswordState(ConfirmPasswordState.WrongPassword);
			}
		}
	};
	const handleChangeConfirmPassword = (event: any) => {
		setConfirmPassword(event.target.value);
		if (event.target.value === password) {
			setConfirmPasswordState(ConfirmPasswordState.CorrectPassword);
		} else {
			setConfirmPasswordState(ConfirmPasswordState.WrongPassword);
		}
	};
	const checkEnableStringPattern = (userID: string, password: string) => {
		if (checkEnableUserIDPattern(userID)) {
			console.log("유효한 ID입니다.");
		} else {
			console.log("유효하지 않은 ID입니다. : ", userID);
			setUserIDState(UserIDState.MismatchPattern);
		}
		if (checkEnablePasswordPattern(password)) {
			console.log("유효한 PW입니다. : ", password);
			setPasswordState(PasswordState.EnablePassword);
		} else {
			console.log("유효하지 않은 PW입니다. : ", password);
			setPasswordState(PasswordState.MismatchPattern);
		}
	};
	const handleClickRegister = () => {
		checkEnableStringPattern(userID, password);
		if (
			userIDState === UserIDState.EnableID &&
			confirmPasswordState === ConfirmPasswordState.CorrectPassword
		) {
			createUserProfile(url, userID, password, discordID).then((response) => {
				if (response.status === 201) {
					console.log("회원가입이 완료되었습니다.");
					setRegister(true);
				} else {
					if (response.status === 400) {
						console.log("아이디 혹은 비밀번호가 유효하지 않습니다.");
					} else if (response.status === 409) {
						console.log("이미 존재하는 회원입니다.");
					}
					console.log("회원가입이 실패하였습니다.", response.status);
					setRegister(false);
				}
			});
			// TODO: 회원가입하기
		} else {
			console.log("아이디 혹은 비밀번호가 유효하지 않습니다.");
			setRegister(false);
		}
	};

	return (
		<Box
			display="flex"
			justifyContent="center" // 가로 정렬
			minHeight="90vh"
			maxHeight="100vh"
		>
			{!register && (
				<Grid
					container
					justifyContent="center" // 세로 정렬
					direction="column"
					spacing={2}
					maxWidth="400px"
				>
					{certificationNumState !== CertNumState.CorrectNum && (
						<DiscordIDCertification
							discordID={discordID}
							certificationNum={certificationNum}
							requestCertNum={requestCertNum}
							handleSuccessToRequestCertNum={handleSuccessToRequestCertNum}
							handleCheckCertNum={handleCheckCertNum}
							handleChangeDiscordID={handleChangeDiscordID}
							handleClickRequestCertNum={handleClickRequestCertNum}
							handleChangeCertNum={handleChangeCertNum}
						></DiscordIDCertification>
					)}
					{certificationNumState === CertNumState.CorrectNum && (
						<Registration
							userID={userID}
							userIDState={userIDState}
							password={password}
							passwordState={passwordState}
							confirmPassword={confirmPassword}
							confirmPasswordState={confirmPasswordState}
							handleChangeUserID={handleChangeUserID}
							handleCheckUserIDDuplication={handleCheckUserIDDuplication}
							handleSetUserIDStateNoCheck={handleSetUserIDStateNoCheck}
							handleChangePassword={handleChangePassword}
							handleChangeConfirmPassword={handleChangeConfirmPassword}
							handleClickRegister={handleClickRegister}
						></Registration>
					)}
				</Grid>
			)}
			{register && ( // 가입 완료되었으면 나타남
				<RegistrationComplete />
			)}
		</Box>
	);
}
export default SignUp;
