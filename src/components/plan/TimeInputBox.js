import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";
import { format } from "date-fns";
import React from "react";

function TimeInputBox({ timeText, TimeCallBack }) {
	const TODAY = new Date();
	const [time, setTime] = useState(format(TODAY, "HH:mm"));
	const [date, setDate] = useState(format(TODAY, "yyyy-MM-dd"));
	const onChangeTime = (event) => {
		setTime(event.target.value);
		TimeCallBack(date, event.target.value);
	};
	const onChangeDate = (event) => {
		setDate(event.target.value);
		TimeCallBack(event.target.value, time);
	};
	return (
		<TimeBox>
			<TimeText>{timeText}</TimeText>
			<TimeInput value={date} mode="date" onChange={onChangeDate}></TimeInput>
			<TimeInput value={time} mode="time" onChange={onChangeTime}></TimeInput>
		</TimeBox>
	);
}

TimeInputBox.propTypes = {
	timeText: PropTypes.string.isRequired,
	TimeCallBack: PropTypes.func.isRequired,
};

const TimeBox = styled.div`
	margin-top: 10px;
	margin-bottom: 10px;
	display: flex;
`;
const TimeText = styled.div`
	margin: auto;
`;
const TimeInput = styled.input.attrs((props) => {
	switch (props.mode) {
		case "time":
			return {
				type: "time",
				step: "600",
				required: true,
			};
		case "date":
			return {
				type: "date",
				required: true,
			};
		default:
			console.error(
				"TimeInput component must have props.mode either 'date' or 'time'."
			);
	}
})`
	height: 20px;
	border: 1px;
	border-radius: 5px;

	margin: auto;

	text-align: center;
	width: 150px;
`;
export default TimeInputBox;
