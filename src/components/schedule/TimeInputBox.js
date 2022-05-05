import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { useState, forwardRef } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/esm/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TimeInputBox({ timeText, TimeCallBack }) {
	const TODAY = new Date();
	const [time, setTime] = useState(format(TODAY, "HH:mm"));
	// const [date, setDate] = useState(format(TODAY, "yyyy-MM-dd"));
	const [date, setDate] = useState(new Date());
	const onChangeTime = (event) => {
		setTime(event.target.value);
		console.log(event.target);
		TimeCallBack(date, event.target.value);
	};
	const onChangeDate = (date) => {
		setDate(date);
		console.log(date);
		TimeCallBack(format(date, "yyyy-MM-dd"), time);
	};
	const CustomDateInput = forwardRef(({ value, onClick, onChange }, ref) => (
		<DateInput
			value={value}
			onClick={onClick}
			onChange={onChange}
			ref={ref}
		></DateInput>
	));
	return (
		<TimeBox>
			<Text>{timeText}</Text>
			<DateWrapper>
				<DatePicker
					selected={date}
					locale={ko}
					onChange={(date) => onChangeDate(date)}
					dateFormat="yyyy-MM-dd (eee)"
					minDate={new Date()}
					customInput={<CustomDateInput />}
				></DatePicker>
			</DateWrapper>
			<DateWrapper>
				<TimeInput value={time} mode="time" onChange={onChangeTime}></TimeInput>
			</DateWrapper>
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
const TimeBoxElement = css`
	width: 30%;
	height: 20px;
	margin: auto;
`;
const Text = styled.div`
	${TimeBoxElement}
`;
const DateWrapper = styled.div`
	${TimeBoxElement}
`;
const DateInput = styled.input`
	box-sizing: border-box;
	width: 100%;
	height: 100%;

	border: 1px;
	border-radius: 5px;

	text-align: center;
	display: block;
`;
const TimeInput = styled.input.attrs({
	type: "time",
	step: "600",
	required: true,
})`
	box-sizing: border-box;
	width: 100%;
	height: 100%;

	border: 1px;
	border-radius: 5px;

	text-align: center;
	display: block;
`;
export default TimeInputBox;
