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

	function getSchedulesOfCurrentDay(
		scheduleIdsOfCurrentDay,
		schedulesOfCurrentMonth
	) {
		let schedules = [];
		for (const scheduleId of scheduleIdsOfCurrentDay) {
			schedules.push(schedulesOfCurrentMonth.get(scheduleId));
		}
		return schedules;
	}

	return (
		<table>
			<thead>
				<CalendarDaysOfWeek></CalendarDaysOfWeek>
			</thead>
			<tbody>
				{calendarOfCurrentMonth.map((calendarWeek) => (
					<tr key={calendarWeek.at(0).currentDay}>
						{calendarWeek.map((calendarDay) => (
							<td
								key={calendarDay.currentDay}
								onClick={() => handleClickCalendarDay(calendarDay.currentDay)}
							>
								<CalendarDay
									currentDay={calendarDay.currentDay}
									isClicked={
										clickedDay &&
										compareAsc(calendarDay.currentDay, selectedDay) === 0
											? true
											: false
									}
									isToday={calendarDay.isToday}
									isCurrentMonth={calendarDay.isCurMonth}
									schedulesOfCurrentDay={
										"schedules" in calendarDay
											? getSchedulesOfCurrentDay(
													calendarDay["schedules"],
													schedulesOfCurrentMonth
											  )
											: null
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
	schedulesOfCurrentMonth: PropTypes.instanceOf(Map).isRequired,
	onSelectDayForDetail: PropTypes.func.isRequired,
};
export default CalendarBody;
