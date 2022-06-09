import { Button, Grid, TextField } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "..";
import { logIn } from "../utils/api/SignInAPI";
function SignIn() {
	const [discordID, setDiscordID] = useState("");
	const [password, setPassword] = useState("");
	const [signIn, setSignIn] = useState(false);
	const { url } = useContext(Context);
	const navigate = useNavigate();
	const onChangeID = (event: any) => {
		// console.log("(debugging) : " + event.target.value);
		setDiscordID(event.target.value);
	};
	const onChangePassword = (event: any) => {
		// console.log("(debugging) : " + event.target.value);
		setPassword(event.target.value);
	};
	const onClickSignIn = () => {
		const response = logIn(url, discordID, password).then((response) => {
			if (response.status === 200) setSignIn(true);
			return response.status;
		});
		// console.log(response);
		// console.log(discordID);
		// console.log(password);
	};
	useEffect(() => {
		if (true === signIn) {
			navigate("/schedule");
			console.log(signIn);
		}
	}, [signIn]);
	return (
		<Grid
			container
			alignItems="center"
			justifyContent={"center"}
			direction="column"
			spacing={2}
		>
			<Grid item>
				<TextField
					label="아이디"
					variant="outlined"
					value={discordID}
					onChange={onChangeID}
				></TextField>
			</Grid>
			<Grid item>
				<TextField
					label="비밀번호"
					variant="outlined"
					type="password"
					value={password}
					onChange={onChangePassword}
				></TextField>
			</Grid>
			<Grid item>
				<Button variant="outlined" onClick={onClickSignIn}>
					로그인
				</Button>
			</Grid>
			<Grid item>
				<Link to="/signup">처음 방문하셨다면 회원가입을 해주세요</Link>
			</Grid>
		</Grid>
	);
}
export default SignIn;
