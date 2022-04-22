import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
function SignIn({ history }) {
	const [discordID, setDiscordID] = useState("");
	const [password, setPassword] = useState("");
	const [signIn, setSignIn] = useState(false);
	const navigate = useNavigate();
	const onChangeID = (event) => {
		console.log("(debugging) : " + event.target.value);
		setDiscordID(event.target.value);
	};
	const onChangePassword = (event) => {
		console.log("(debugging) : " + event.target.value);
		setPassword(event.target.value);
	};
	const onClickSignIn = () => {
		setSignIn(true);
		console.log(signIn);
	};
	useEffect(() => {
		if (true === signIn) {
			navigate("/manage");
		}
	}, [signIn]);
	function ChangeForm() {
		return (
			<div>
				<div>
					<input
						value={discordID}
						placeholder="디스코드 ID"
						onChange={onChangeID}
					></input>
					<input
						value={password}
						placeholder="비밀번호"
						onChange={onChangePassword}
					></input>
					<button onClick={onClickSignIn}>로그인</button>
				</div>
				<Link to="/signup">
					<div>처음 방문하셨다면 회원가입을 해주세요</div>
				</Link>
			</div>
		);
	}
	return (
		<div>
			<ChangeForm></ChangeForm>
		</div>
	);
}
export default SignIn;
