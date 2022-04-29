import {
	getDay,
	getWeekOfMonth,
	startOfMonth,
	isSameMonth,
	compareAsc,
} from "date-fns";
import CalendarDay from "./CalendarDay";
import CalendarDaysOfWeek from "./CalendarDaysOfWeek";
import { GenerateOneMonth } from "../../utils/calendar/CalendarDateGeneration";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function mergePeopleInfoAndCalendar(currentDay, daysOfMonth, peopleInfo) {
	peopleInfo.sort(function (p1, p2) {
		return compareAsc(p1.startTime, p2.startTime);
	});
	for (let person of peopleInfo) {
		if (!isSameMonth(currentDay, person.startTime)) continue;
		const weekIndex = getWeekOfMonth(person.startTime) - 1;
		const dayIndex = getDay(person.startTime);
		if ("peopleInfo" in daysOfMonth[weekIndex][dayIndex]) {
			daysOfMonth[weekIndex][dayIndex]["peopleInfo"].push(person);
		} else {
			daysOfMonth[weekIndex][dayIndex]["peopleInfo"] = [person];
		}
	}
	return daysOfMonth;
}

function getPeopleInfoOfSelectedDay(selectedDay, daysInfoOfMonth) {
	const weekIndex = getWeekOfMonth(selectedDay) - 1;
	const dayIndex = getDay(selectedDay);
	if ("peopleInfo" in daysInfoOfMonth[weekIndex][dayIndex]) {
		return daysInfoOfMonth[weekIndex][dayIndex]["peopleInfo"];
	}
	return [];
}

function CalendarBody({ currentDay, peopleInfo, selectedDayCallBack }) {
	const currentStartDayOfMonth = startOfMonth(currentDay);
	const daysInfoOfMonth = mergePeopleInfoAndCalendar(
		currentDay,
		GenerateOneMonth(currentStartDayOfMonth),
		peopleInfo
	);
	const [clickedDay, setClickedDay] = useState(false);
	const [selectedDay, setSelectedDay] = useState(currentDay);

	const onClickCalendarDay = (day) => {
		if (compareAsc(day, selectedDay) === 0) {
			setClickedDay((current) => !current);
		} else {
			setClickedDay(true);
			setSelectedDay(day);
		}
		// console.log(daysOfMonth);
	};

	useEffect(() => {
		selectedDayCallBack({
			selectedDay: selectedDay,
			dayClicked: clickedDay,
			peopleInfoOfSelectedDay: getPeopleInfoOfSelectedDay(
				selectedDay, // day
				daysInfoOfMonth
			),
		});
	}, [clickedDay, selectedDay]);

	return (
		<table>
			<thead>
				<CalendarDaysOfWeek></CalendarDaysOfWeek>
			</thead>
			<tbody>
				{daysInfoOfMonth.map((week) => (
					<tr key={week.at(0).currentDay}>
						{week.map((day) => (
							<td
								key={day.currentDay}
								onClick={() => onClickCalendarDay(day.currentDay)}
							>
								<CalendarDay
									currentDay={day.currentDay}
									isClicked={
										clickedDay && compareAsc(day.currentDay, selectedDay) === 0
											? true
											: false
									}
									isToday={day.isToday}
									isCurMonth={day.isCurMonth}
									peopleInfo={"peopleInfo" in day ? day.peopleInfo : null}
								></CalendarDay>
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
CalendarBody.propTypes = {
	currentDay: PropTypes.instanceOf(Date).isRequired,
	peopleInfo: PropTypes.array,
	selectedDayCallBack: PropTypes.func.isRequired,
};
export default CalendarBody;
