import { Button, Grid, Snackbar, TextField } from "@mui/material";
import { RequestCertNumState } from "../../pages/SignUp";

export function DiscordIDCertification({
	discordID,
	certificationNum,
	requestCertNum,
	handleCheckCertNum,
	handleChangeDiscordID,
	handleClickRequestCertNum,
	handleChangeCertNum,
}: {
	discordID: string;
	certificationNum: string;
	requestCertNum: RequestCertNumState;
	handleCheckCertNum: any;
	handleChangeDiscordID: any;
	handleClickRequestCertNum: any;
	handleChangeCertNum: any;
}) {
	// const discordIDTextFieldSetting = (requestCertNum: RequestCertNumState) => {
	// 	let discordIDTextField: { color: any; message: string } = {
	// 		color: "primary",
	// 		message: "",
	// 	};
	// 	switch (requestCertNum) {
	// 		case RequestCertNumState.EmptyDiscordID: {
	// 			discordIDTextField = {
	// 				color: "warning",
	// 				message: "ID를 입력해주십시오.",
	// 			};
	// 			break;
	// 		}
	// 		case RequestCertNumState.WrongDiscordID: {
	// 			discordIDTextField = {
	// 				color: "error",
	// 				message: "ID가 존재하지 않습니다.",
	// 			};
	// 			break;
	// 		}
	// 		case RequestCertNumState.SuccessToRequest: {
	// 			discordIDTextField = {
	// 				color: "success",
	// 				message: "인증번호가 발급되었습니다.",
	// 			};
	// 			break;
	// 		}
	// 		default: {
	// 			discordIDTextField = { color: "primary", message: "" };
	// 		}
	// 	}
	// 	return discordIDTextField;
	// };
	return (
		<>
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
						// disabled={requestCertNum}
						fullWidth
					/>
				</Grid>
				<Grid item container xs={12} sm={5} alignItems="stretch">
					<Button
						variant="outlined"
						onClick={handleClickRequestCertNum}
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
			<Grid item>
				<Button variant="contained" onClick={handleCheckCertNum} fullWidth>
					인증번호 확인
				</Button>
			</Grid>
		</>
	);
}
