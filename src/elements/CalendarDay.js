import styled from "styled-components";
import "../styles/Colors.module.css";
import { format } from "date-fns";
import { useState, useEffect } from "react";
function CalendarDay({ currentDay, isClicked, isToday }) {
	// const [isBoxClicked, setIsBoxClicked] = useState(false);
	// const onClickDayBox = () => {
	// 	setIsBoxClicked((current) => !current);
	// };
	const day = format(currentDay, "d");
	const onClickBox = (data) => {
		console.log(data);
	};
	return (
		<StyledCalendarDayBox
			isClicked={isClicked}
			isToday={isToday}
			value={currentDay}
			// onClick={onClickBox(day)}
		>
			<StyledCalendarDate>{day}</StyledCalendarDate>
			<StyledCarlendarDayTagBox></StyledCarlendarDayTagBox>
		</StyledCalendarDayBox>
	);
}
const StyledCalendarDayBox = styled.div`
	height: 100px;
	width: 100px;
	border: ${(props) =>
		props.isClicked
			? borderDayBoxClicked
			: props.isToday
			? borderDayBoxToday
			: borderDayBoxDefault};
`;
const borderDayBoxDefault = `1px solid black`;
const borderDayBoxClicked = `1px solid tomato`;
const borderDayBoxToday = `2px solid var(--discord-color-blue)`;
const StyledCalendarDate = styled.div`
	height: 20px;
	font-size: 12px;
`;
const StyledCarlendarDayTagBox = styled.div`
	height: 80px;
	width: 100px;
	overflow-wrap: break-word;
	overflow-y: auto;
`;
export default CalendarDay;
