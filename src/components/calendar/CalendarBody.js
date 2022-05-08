import { compareAsc } from "date-fns";
import CalendarDay from "./CalendarDay";
import CalendarDaysOfWeek from "./CalendarDaysOfWeek";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function CalendarBody({
	currentDay,
	schedulesOfCurrentMonth,
	calendarOfCurrentMonth,
	onSelectDayForDetail,
}) {
	const [clickedDay, setClickedDay] = useState(false);
	const [selectedDay, setSelectedDay] = useState(currentDay);

	const handleClickCalendarDay = (day) => {
		if (compareAsc(day, selectedDay) === 0) {
			setClickedDay((current) => !current);
		} else {
			setClickedDay(true);
			setSelectedDay(day);
		}
		// console.log(daysOfMonth);
	};

	useEffect(() => {
		onSelectDayForDetail({
			_selectedDay: selectedDay,
			_dayClicked: clickedDay,
		});
	}, [clickedDay, selectedDay]);

	return (
		<table>
			<thead>
				<CalendarDaysOfWeek></CalendarDaysOfWeek>
			</thead>
			<tbody>
				{calendarOfCurrentMonth.map((week) => (
					<tr key={week.at(0).currentDay}>
						{week.map((day) => (
							<td
								key={day.currentDay}
								onClick={() => handleClickCalendarDay(day.currentDay)}
							>
								<CalendarDay
									currentDay={day.currentDay}
									isClicked={
										clickedDay && compareAsc(day.currentDay, selectedDay) === 0
											? true
											: false
									}
									isToday={day.isToday}
									isCurrentMonth={day.isCurMonth}
									schedulesOfCurrentDay={
										"peopleInfo" in day ? day.peopleInfo : null
									}
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
	schedulesOfCurrentMonth: PropTypes.array,
	onSelectDayForDetail: PropTypes.func.isRequired,
};
export default CalendarBody;
