import {
	Alert,
	AlertColor,
	Button,
	Grid,
	Snackbar,
	TextField,
} from "@mui/material";
import { useState } from "react";
import { DiscordIDState } from "../../pages/SignUp";

export function DiscordIDCertification({
	discordID,
	certificationNum,
	requestCertNum,
	handleSuccessToRequestCertNum,
	handleCheckCertNum,
	handleChangeDiscordID,
	handleClickRequestCertNum,
	handleChangeCertNum,
}: {
	discordID: string;
	certificationNum: string;
	requestCertNum: DiscordIDState;
	handleSuccessToRequestCertNum: any;
	handleCheckCertNum: any;
	handleChangeDiscordID: any;
	handleClickRequestCertNum: any;
	handleChangeCertNum: any;
}) {
	console.log(requestCertNum);
	// const requestAlertContext: Map<RequestCertNumState, {severity: AlertColor, message:string}> =
	// 	{
	// 		(RequestCertNumState.EmptyDiscordID: { severity: "warning", message: "ID를 입력해주십시오." }),
	// 		RequestCertNumState.WrongDiscordID: { severity: "error", message: "ID가 존재하지 않습니다." },
	// 		RequestCertNumState.SuccessToRequest:{ severity: "success", message: "인증번호가 발급되었습니다." }
	//   };
	const requestAlertContext = (
		requestCertNum: DiscordIDState
	): { severity: AlertColor; message: string } => {
		switch (requestCertNum) {
			case DiscordIDState.EmptyDiscordID: {
				return { severity: "warning", message: "ID를 입력해주십시오." };
			}
			case DiscordIDState.WrongDiscordID: {
				return { severity: "error", message: "ID가 존재하지 않습니다." };
			}
			case DiscordIDState.SuccessToRequestCertNum: {
				return { severity: "success", message: "인증번호가 발급되었습니다." };
			}
			default:
				return { severity: "info", message: "" };
		}
	};
	return (
		<>
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={requestCertNum === DiscordIDState.SuccessToRequestCertNum}
				onClose={handleSuccessToRequestCertNum}
				autoHideDuration={1000}
			>
				<Alert
					severity={
						requestAlertContext(DiscordIDState.SuccessToRequestCertNum).severity
					}
				>
					{requestAlertContext(DiscordIDState.SuccessToRequestCertNum).message}
				</Alert>
			</Snackbar>
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={requestCertNum === DiscordIDState.WrongDiscordID}
				onClose={handleSuccessToRequestCertNum}
				autoHideDuration={1000}
			>
				<Alert
					severity={requestAlertContext(DiscordIDState.WrongDiscordID).severity}
				>
					{requestAlertContext(DiscordIDState.WrongDiscordID).message}
				</Alert>
			</Snackbar>
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={requestCertNum === DiscordIDState.EmptyDiscordID}
				onClose={handleSuccessToRequestCertNum}
				autoHideDuration={1000}
			>
				<Alert
					severity={requestAlertContext(DiscordIDState.EmptyDiscordID).severity}
				>
					{requestAlertContext(DiscordIDState.EmptyDiscordID).message}
				</Alert>
			</Snackbar>
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
