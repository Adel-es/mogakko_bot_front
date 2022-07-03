import {
	Alert,
	Box,
	Button,
	Grid,
	IconButton,
	InputAdornment,
	Snackbar,
	TextField,
	Tooltip,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
	ConfirmPasswordState,
	PasswordState,
	UserIDState,
} from "../../pages/SignUp";

export function Registration({
	userID,
	userIDState,
	password,
	passwordState,
	confirmPassword,
	confirmPasswordState,
	handleChangeUserID,
	handleCheckUserIDDuplication,
	handleSetUserIDStateNoCheck,
	handleChangePassword,
	handleChangeConfirmPassword,
	handleClickRegister,
}: {
	userID: string;
	userIDState: UserIDState;
	password: string;
	passwordState: PasswordState;
	confirmPassword: string;
	confirmPasswordState: ConfirmPasswordState;
	handleChangeUserID: any;
	handleCheckUserIDDuplication: any;
	handleSetUserIDStateNoCheck: any;
	handleChangePassword: any;
	handleChangeConfirmPassword: any;
	handleClickRegister: any;
}) {
	const checkUserIDError = (userIDState: UserIDState) => {
		switch (userIDState) {
			case UserIDState.EnableID:
			case UserIDState.NoTyping:
			case UserIDState.NoCheck:
				return false;
			default:
				return true;
		}
	};
	const checkPasswordError = (passwordState: PasswordState) => {
		switch (passwordState) {
			case PasswordState.EnablePassword:
			case PasswordState.NoCheck:
			case PasswordState.NoTyping:
				return false;
			default:
				return true;
		}
	};
	return (
		<>
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={userIDState === UserIDState.DuplicatedID}
				onClose={handleSetUserIDStateNoCheck}
				autoHideDuration={1000}
			>
				<Alert severity={"error"}>중복된 아이디 입니다.</Alert>
			</Snackbar>
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
				<Grid item container xs={12} sm={7}>
					<TextField
						value={userID}
						placeholder="아이디"
						onChange={handleChangeUserID}
						error={checkUserIDError(userIDState)}
						fullWidth
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<Tooltip title="아이디는 3자 이상 20자 이하의 영문 대소문자, 숫자, 특수문자(_, -)를 포함할 수 있습니다.">
										<IconButton>
											<HelpOutlineIcon fontSize="small" />
										</IconButton>
									</Tooltip>
								</InputAdornment>
							),
						}}
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
							error={checkPasswordError(passwordState)}
							fullWidth
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Tooltip title="비밀번호는 8자 이상 16자 이하의 영문 대소문자, 숫자, 특수문자를 포함할 수 있습니다.">
											<IconButton>
												<HelpOutlineIcon fontSize="small" />
											</IconButton>
										</Tooltip>
									</InputAdornment>
								),
							}}
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
