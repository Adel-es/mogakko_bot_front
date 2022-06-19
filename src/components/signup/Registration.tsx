import { Alert, Button, Grid, TextField } from "@mui/material";
import { ConfirmPasswordState, UserIDState } from "../../pages/SignUp";

export function Registration({
	userID,
	userIDState,
	password,
	confirmPassword,
	confirmPasswordState,
	handleChangeUserID,
	handleCheckUserIDDuplication,
	handleChangePassword,
	handleChangeConfirmPassword,
	handleClickRegister,
}: {
	userID: string;
	userIDState: UserIDState;
	password: string;
	confirmPassword: string;
	confirmPasswordState: ConfirmPasswordState;
	handleChangeUserID: any;
	handleCheckUserIDDuplication: any;
	handleChangePassword: any;
	handleChangeConfirmPassword: any;
	handleClickRegister: any;
}) {
	const userIDCheckError = (userIDState: UserIDState): string => {
		switch (userIDState) {
			case UserIDState.DuplicatedID: {
				return "success";
			}
			default: {
				return "primary";
			}
		}
	};
	const userIDCheckColor = (userIDState: UserIDState): string => {
		switch (userIDState) {
			case UserIDState.EnableID: {
				return "success";
			}
			default: {
				return "primary";
			}
		}
	};
	return (
		<>
			<Grid
				item
				container
				spacing={2}
				alignItems="stretch" // 하위의 버튼 높이 stretch
			>
				<Grid item xs={12}>
					<TextField
						// value={certificationNum}
						value="닉네임 자동완성"
						// placeholder="닉네임"
						// onChange={handleChangeCertNum}
						disabled
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={7}>
					<TextField
						value={userID}
						placeholder="아이디"
						onChange={handleChangeUserID}
						fullWidth
					/>
				</Grid>

				<Grid item container xs={12} sm={5} alignItems="stretch">
					<Button
						variant="outlined"
						onClick={handleCheckUserIDDuplication} // TODO: 아이디 중복 확인
						fullWidth
					>
						아이디 중복 확인
					</Button>
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
						<Button variant="contained" onClick={handleClickRegister} fullWidth>
							회원 가입
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
}
