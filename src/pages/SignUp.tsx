import { Button, Grid, TextField, Box, createTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const enum CertNumState {
	NoCheck = 3,
	WrongNum = 1,
	CorrectNum = 2,
}
const enum ConfirmPasswordState {
	NoTyping = 0,
	WrongPassword = 1,
	CorrectPassword = 2,
}
function SignUp() {
	const [discordID, setDiscordID] = useState("");
	const [requestCertNum, setRequestCertNum] = useState(false);
	const [certificationNum, setCertificationNum] = useState("");
	const [isCorrectCertNum, setIsCorrectCertNum] = useState<CertNumState>(
		CertNumState.NoCheck
	);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [confirmPasswordState, setConfirmPasswordState] =
		useState<ConfirmPasswordState>(ConfirmPasswordState.NoTyping);
	const [register, setRegister] = useState(false);

	const handleChangeDiscordID = (event: any) => {
		setDiscordID(event.target.value);
	};
	const handleClickCorrectID = () => {
		setRequestCertNum(true);
	};
	const handleChangeCertNum = (event: any) => {
		setCertificationNum(event.target.value);
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
	const handlelickRegister = () => {
		// TODO: 회원 가입 버튼 눌렀을 때 넘어가는 조건 작성
		// setIsCorrectCertNum(true);
		if (true) {
			// api 호출
			setIsCorrectCertNum(CertNumState.CorrectNum);
		} else {
			setIsCorrectCertNum(CertNumState.WrongNum);
		}
		if (confirmPasswordState === ConfirmPasswordState.CorrectPassword)
			setRegister(true);
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
					<Grid
						item
						container
						spacing={2}
						alignItems="stretch" // 하위의 버튼 높이 stretch
					>
						<Grid item xs={12} sm={7}>
							<TextField
								value={discordID}
								placeholder={"디스코드 ID"}
								onChange={handleChangeDiscordID}
								disabled={requestCertNum}
								fullWidth
							/>
						</Grid>
						<Grid item container xs={12} sm={5} alignItems="stretch">
							<Button
								variant="outlined"
								onClick={handleClickCorrectID}
								fullWidth
							>
								인증번호 받기
							</Button>
						</Grid>
					</Grid>
					<Grid item>
						<TextField
							value={certificationNum}
							placeholder="인증번호"
							onChange={handleChangeCertNum}
							fullWidth
						/>
					</Grid>
					<Grid item container spacing={2}>
						<Grid item xs={12}>
							<TextField
								value={password}
								placeholder="비밀번호"
								onChange={handleChangePassword}
								type="password"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								value={confirmPassword}
								placeholder="비밀번호 확인"
								onChange={handleChangeConfirmPassword}
								type="password"
								error={
									confirmPasswordState === ConfirmPasswordState.WrongPassword
								}
								color={
									confirmPasswordState === ConfirmPasswordState.CorrectPassword
										? "success"
										: "primary"
								}
								helperText={
									confirmPasswordState === ConfirmPasswordState.WrongPassword
										? "비밀번호가 일치하지 않습니다."
										: ""
								}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="contained"
								onClick={handlelickRegister}
								fullWidth
							>
								회원 가입
							</Button>
						</Grid>
					</Grid>
				</Grid>
			)}
			{requestCertNum &&
				isCorrectCertNum &&
				register && ( // 가입 완료되었으면 나타남
					<Grid
						container
						direction="column"
						spacing={10}
						justifyContent="center"
						alignContent={"center"}
					>
						<Grid item>
							<Box style={{ fontSize: "20px" }}>회원가입을 완료하였습니다.</Box>
						</Grid>
						<Grid item>
							<Button
								fullWidth
								variant="outlined"
								component={Link}
								to={"/signin"}
							>
								로그인 창으로 이동하기
							</Button>
						</Grid>
					</Grid>
				)}
		</Box>
	);
}
export default SignUp;
