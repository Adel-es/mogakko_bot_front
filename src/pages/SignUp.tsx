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

const enum CertNumState {
	NoCheck = 3,
	WrongNum = 1,
	CorrectNum = 2,
}
export const enum RequestCertNumState {
	NoRequest = 0,
	EmptyDiscordID = 1,
	WrongDiscordID = 2,
	SuccessToRequest = 10,
}
export const enum ConfirmPasswordState {
	NoTyping = 0,
	WrongPassword = 1,
	CorrectPassword = 2,
}
export const enum UserIDState {
	NoTyping = 0,
	NoCheck = 1,
	DuplicatedID = 2,
	EnableID = 3,
}
function SignUp() {
	const [discordID, setDiscordID] = useState("");
	const [requestCertNum, setRequestCertNum] = useState<RequestCertNumState>(
		RequestCertNumState.NoRequest
	); // => snackbar
	const [certificationNum, setCertificationNum] = useState("");
	const [certificationNumState, setCertificationNumState] =
		useState<CertNumState>(CertNumState.NoCheck);

	const [userID, setUserID] = useState(""); // ID 중복 체크 하기
	const [userIDState, setUserIDState] = useState<UserIDState>(
		UserIDState.NoTyping
	);
	const [password, setPassword] = useState("");
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
			setRequestCertNum(RequestCertNumState.EmptyDiscordID);
			return;
		}

		requestVerificationCode(url, discordID).then((response) => {
			if (response.status === 200) {
				console.log("인증번호 전송됨");
				setRequestCertNum(RequestCertNumState.SuccessToRequest);
			} else {
				setRequestCertNum(RequestCertNumState.WrongDiscordID);
			}
		});
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
	const handleChangePassword = (event: any) => {
		setPassword(event.target.value);
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
	const handleCheckCertNum = () => {
		if (requestCertNum !== RequestCertNumState.SuccessToRequest) {
			console.log("인증번호가 발급되지 않았습니다.");
			return;
		}
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
	const handleClickRegister = () => {
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
							confirmPassword={confirmPassword}
							confirmPasswordState={confirmPasswordState}
							handleChangeUserID={handleChangeUserID}
							handleCheckUserIDDuplication={handleCheckUserIDDuplication}
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
