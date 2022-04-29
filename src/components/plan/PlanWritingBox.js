import styled from "styled-components";
import { useState } from "react";
import { format } from "date-fns";
import TimeInputBox from "./TimeInputBox";

function PlanWritingBox() {
	const TODAY = new Date();
	const [startTime, setStartTime] = useState(format(TODAY, "HH:mm"));
	const [startDate, setStartDate] = useState(format(TODAY, "yyyy-MM-dd"));
	const [endTime, setEndTime] = useState(format(TODAY, "HH:mm"));
	const [endDate, setEndDate] = useState(format(TODAY, "yyyy-MM-dd"));
	const onClickSubmit = () => {
		console.log(startDate);
		console.log(startTime);
		console.log(endDate);
		console.log(endTime);
		// TODO: parent의 callback 함수로 start, end 보내기
	};
	const startTimeCallBack = (_startDate, _startTime) => {
		setStartDate(_startDate);
		setStartTime(_startTime);
	};
	const endTimeCallBack = (_endDate, _endTime) => {
		setEndDate(_endDate);
		setEndTime(_endTime);
	};
	return (
		<Box>
			<TimeInputBox
				timeText={"시작 시각"}
				TimeCallBack={startTimeCallBack}
			></TimeInputBox>
			<TimeInputBox
				timeText={"종료 시각"}
				TimeCallBack={endTimeCallBack}
			></TimeInputBox>
			<SubmitButton onClick={onClickSubmit}>OK</SubmitButton>
		</Box>
	);
}
const Box = styled.div.attrs({ className: "timebox" })`
	width: 60%;
	height: 60%;

	padding: 5px;
	background-color: lightgreen;
	border: 1px;
	border-radius: 5px;

	text-align: center;

	margin: auto;
	margin-top: 20px;
	margin-bottom: 20px;

	display: block;
`;
const SubmitButton = styled.button`
	width: 100px;
	height: 20px;
`;
export default PlanWritingBox;
