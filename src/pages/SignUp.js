import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function SignUp() {
	const [discordID, setDiscordID] = useState("");
	const [isCorrectID, setIsCorrectID] = useState(false);
	const [certificationNum, setCertificationNum] = useState("");
	const [isCorrectCertNum, setIsCorrectCertNum] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPasswor] = useState("");
	const [register, setRegister] = useState(false);

	const onChangeID = (event) => {
		console.log("(debugging)" + event.target.value);
		// setDiscordID(state.value);
	};
	const onClickID = () => {
		setIsCorrectID(true);
	};
	const onChangeCertNum = (event) => {
		console.log("(debugging)" + event.target.value);
	};
	const onClickCertNum = () => setIsCorrectCertNum(true);
	const onChangePassword = (event) => {
		console.log("(debugging)" + event.target.value);
	};
	const onChangeConfirmPassword = (event) => {
		console.log("(debugging)" + event.target.value);
	};
	const onClickRegister = () => setRegister(true);
	function GetDiscordID() {
		// function checkCorrectID() {}
		return (
			<div>
				<p>인증번호를 받을 DiscordID를 입력하세요</p>
				<input
					value={discordID}
					placeholder="디스코드 ID"
					onChange={onChangeID}
				></input>
				<button onClick={onClickID}>다음 단계</button>
			</div>
		);
	}
	function PutCertificationNum() {
		// function CheckCertificationNum() {}
		return (
			<div>
				<input
					value={discordID}
					placeholder="디스코드 ID"
					disabled={true}
				></input>
				<input
					value={certificationNum}
					placeholder="인증번호"
					onChange={onChangeCertNum}
				></input>
				<button onClick={onClickCertNum}>인증번호 확인</button>
			</div>
		);
	}
	function GetNewPassword() {
		return (
			<div>
				<input
					value={discordID}
					placeholder="디스코드 ID"
					disabled={true}
				></input>
				<input
					value={password}
					placeholder="비밀번호"
					onChange={onChangePassword}
				></input>
				<input
					value={confirmPassword}
					placeholder="비밀번호 확인"
					onChange={onChangeConfirmPassword}
				></input>
				<button onClick={onClickRegister}>회원가입</button>
			</div>
		);
	}
	function ChangeForm() {
		console.log("isCorrectID: " + isCorrectID);
		console.log("isCorrectCertNum: " + isCorrectCertNum);
		if (false === isCorrectID) {
			return <GetDiscordID></GetDiscordID>;
		}
		if (false === isCorrectCertNum) {
			return <PutCertificationNum></PutCertificationNum>;
		}
		if (false === register) {
			return <GetNewPassword></GetNewPassword>;
		}
		return (
			<div>
				<p>회원가입을 완료하였습니다.</p>
				<Link to="/signin">로그인 창으로 이동하기</Link>
			</div>
		);
	}
	return (
		<div>
			<ChangeForm></ChangeForm>
		</div>
	);
}
export default SignUp;
