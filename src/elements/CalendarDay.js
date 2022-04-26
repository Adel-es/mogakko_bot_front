import styled from "styled-components";
import "../styles/Colors.module.css";
import { format } from "date-fns";
import { useState, useEffect } from "react";
function CalendarDay({ currentDay, isClicked, isToday, isCurMonth }) {
	const day = format(currentDay, "d");
	return (
		<StyledCalendarDayBox
			isClicked={isClicked}
			isToday={isToday}
			isCurMonth={isCurMonth}
			value={currentDay}
		>
			<StyledCalendarDate>{day}</StyledCalendarDate>
			<StyledCarlendarDayTagBox></StyledCarlendarDayTagBox>
		</StyledCalendarDayBox>
	);
}
const StyledCalendarDayBox = styled.div`
	height: 100px;
	width: 100px;
	${(props) =>
		!props.isCurMonth ? borderDayBoxCurMonth : borderDayBoxDefault};
	${(props) =>
		props.isClicked
			? borderDayBoxClicked
			: props.isToday
			? borderDayBoxToday
			: ``};
`;
const borderDayBoxDefault = `border: 1px solid black;`;
const borderDayBoxClicked = `
	--clicked-color: tomato; 
	border: 1px solid var(--clicked-color); 
	background-color: var(--clicked-color);`;
const borderDayBoxToday = `border: 2px solid var(--discord-color-blue);`;
const borderDayBoxCurMonth = `
	--current-month-color: lightgray;
	border: 1px solid var(--current-month-color); 
	color: var(--current-month-color);`;
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
