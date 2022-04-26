import { format, startOfDay, startOfMonth, compareAsc } from "date-fns";
import CalendarDay from "../elements/CalendarDay";
import { GenerateOneMonth } from "../common/utils/CalendarDateGeneration";
import { useState } from "react";

const TODAY = new Date();

const CalendarDaysOfWeek = () => {
	const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	return (
		<tr>
			{daysOfTheWeek.map((dayOfTheWeek) => (
				<th key={dayOfTheWeek}>{dayOfTheWeek}</th>
			))}
		</tr>
	);
};
function CalendarBody({ currentDay }) {
	const currentStartDayOfMonth = startOfMonth(currentDay);
	const daysOfMonth = GenerateOneMonth(currentStartDayOfMonth);
	const [clickedDay, setClickedDay] = useState(false);
	const [selectedDay, setSelectedDay] = useState(currentDay);

	const onClickCalendarDay = (day) => {
		if (compareAsc(day, selectedDay) === 0) {
			setClickedDay((current) => !current);
		} else {
			setClickedDay(true);
			setSelectedDay(day);
		}
		console.log(format(day, "d"));
	};

	return (
		<table>
			<thead>
				<CalendarDaysOfWeek></CalendarDaysOfWeek>
			</thead>
			<tbody>
				{daysOfMonth.map((week) => (
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
								></CalendarDay>
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
export default CalendarBody;
