import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import PropTypes from "prop-types";

function Calendar({
	currentCalendarDate,
	onMoveCalendarMonth,
	onSelectDayForDetail,
	schedulesOfCurrentMonth,
	calendarOfCurrentMonth,
}) {
	return (
		<div>
			<CalendarHeader
				currentCalendarDate={currentCalendarDate}
				onMoveCalendarMonth={onMoveCalendarMonth}
			></CalendarHeader>
			<CalendarBody
				currentDay={currentCalendarDate}
				schedulesOfCurrentMonth={schedulesOfCurrentMonth}
				calendarOfCurrentMonth={calendarOfCurrentMonth}
				onSelectDayForDetail={onSelectDayForDetail}
			></CalendarBody>
		</div>
	);
}
Calendar.propTypes = {
	schedulesOfCurrentMonth: PropTypes.array,
	onSelectDayForDetail: PropTypes.func.isRequired,
};
export default Calendar;
