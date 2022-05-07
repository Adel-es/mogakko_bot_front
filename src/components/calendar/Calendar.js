import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import PropTypes from "prop-types";

function Calendar({
	currentCalendarDate,
	onMoveCalendarMonth,
	onSelectDayForDetail,
	peopleInfo,
	schedulesOfCurrentMonth,
}) {
	return (
		<div>
			<CalendarHeader
				currentCalendarDate={currentCalendarDate}
				onMoveCalendarMonth={onMoveCalendarMonth}
			></CalendarHeader>
			<CalendarBody
				currentDay={currentCalendarDate}
				peopleInfo={peopleInfo}
				schedulesOfCurrentMonth={schedulesOfCurrentMonth}
				onSelectDayForDetail={onSelectDayForDetail}
			></CalendarBody>
		</div>
	);
}
Calendar.propTypes = {
	peopleInfo: PropTypes.array,
	onSelectDayForDetail: PropTypes.func.isRequired,
};
export default Calendar;
