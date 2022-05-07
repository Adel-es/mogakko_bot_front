import styled from "styled-components";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import TimeInputBox from "./TimeInputBox";
import ScheduleInfoStruct from "../../utils/schedule/ScheduleInfoStruct";

function CreateScheduleBox({ selectedDay, createNewScheduleCallBack }) {
	const [startDate, setStartDate] = useState(selectedDay);
	const [endDate, setEndDate] = useState(selectedDay);
	// selecteDay click 했을 땐 					: 시작 시각, 종료시각의 date, minDate가 -> selectedDay로 바뀌어야 함.
	// TODO: ==> selectedDay를 바꿨을 땐 그냥 createScheduleBox가 없어지도록 하기.
	// 시작 시각, 종료 시각 각자를 눌렀을 땐 : 각자 date만 반영되어야 함.
	// 시작 시각을 눌렀을 시 								: 종료시각의  minDate == 시작 시각
	//
	const onClickSubmit = () => {
		console.log(startDate);
		console.log(endDate);
		createNewScheduleCallBack(ScheduleInfoStruct("test", startDate, endDate));
	};
	const startTimeCallBack = (_startDate) => {
		setStartDate(_startDate);
	};
	const endTimeCallBack = (_endDate) => {
		setEndDate(_endDate);
	};
	return (
		<Box>
			<TimeInputBox
				timeText={"시작 시각"}
				schedMinDate={new Date()}
				TimeCallBack={startTimeCallBack}
			></TimeInputBox>
			<TimeInputBox
				timeText={"종료 시각"} // TODO: minDate가 시작 시각 이후로 잡히게 하기
				schedMinDate={startDate}
				TimeCallBack={endTimeCallBack}
			></TimeInputBox>
			<SubmitButton onClick={onClickSubmit}>OK</SubmitButton>
		</Box>
	);
}
CreateScheduleBox.propTypes = {
	createNewScheduleCallBack: PropTypes.func.isRequired,
};
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
export default CreateScheduleBox;
